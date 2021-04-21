import React, {ReactNode, ReactText} from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, message, Spin, Table } from 'antd';
import {ColumnProps, TableProps} from 'antd/es/table';
import {Key, RowSelectionType, SorterResult, TablePaginationConfig} from 'antd/es/table/interface';
import {
  action,
  computed,
  IReactionDisposer,
  observable,
  reaction,
  toJS,
  makeObservable,
} from 'mobx';
import {observer} from 'mobx-react';
import {ComparisonType, CustomFilterInputValue} from './DataTableCustomFilter';
import './DataTable.less';
import {FormattedMessage, injectIntl, WrappedComponentProps} from 'react-intl';
import {
  graphqlFilterToTableFilters,
  generateDataColumn,
  handleTableChange,
  getPreservedConditions
} from './DataTableHelpers';
import {EntityAttrPermissionValue, getStringId} from "@haulmont/jmix-rest";
import {
  MainStoreInjected,
  injectMainStore,
  assertNever,
  getPropertyInfoNN,
  WithId,
  EntityInstance,
  HasId,
  MayHaveInstanceName
} from '@haulmont/jmix-react-core';
import { FormInstance } from 'antd/es/form';
import {ApolloError} from "@apollo/client";
import {FilterChangeCallback, JmixEntityFilter, JmixSortOrder, PaginationChangeCallback, SortOrderChangeCallback} from '../../crud/interfaces';

/**
 * @typeparam TEntity - entity type.
 */
export interface DataTableProps<TEntity> extends MainStoreInjected, WrappedComponentProps {

  items: TEntity[];
  loading: boolean;
  error?: ApolloError;
  /**
   * Initial state of table filters.
   * Can be used to set a filtering condition on an entity attribute that is not displayed.
   */
  initialFilter?: JmixEntityFilter;
  onFilterChange: FilterChangeCallback;
  defaultSortOrder?: JmixSortOrder;
  onSortOrderChange: SortOrderChangeCallback;
  onPaginationChange: PaginationChangeCallback;
  entityName: string;
  associationOptionsMap?: Map<string, Array<HasId & MayHaveInstanceName>>;

  /**
   * Names of columns that should have filters enabled.
   * Default: filters will be enabled on all columns. Pass empty array to disable all filters.
   */
  enableFiltersOnColumns?: string[],
  /**
   * By default, when any number of filters is active, a `Clear filters` control will be displayed above the
   * table. When clicked, this control disables all filters at once.
   * If `hideClearFilters` is `true`, then the `Clear filters` control won't be displayed.
   * Default: `false`
   */
  hideClearFilters?: boolean,
  /**
   * A callback that takes the ids of the selected rows.
   * Can be used together with {@link buttons} to facilitate CRUD operations or other functionality.
   *
   * @param selectedRowKeys - entity ids corresponding to the selected rows.
   */
  onRowSelectionChange?: (selectedRowKeys: string[]) => void,
  /**
   * `single` allows to select one row at a time.
   * `multi` allows to select multiple rows.
   * `none` disables row selection.
   * Default: `single`.
   */
  rowSelectionMode?: 'single' | 'multi' | 'none',
  /**
   * When `true`, hides the {@link https://ant.design/components/table | selection column}.
   * Default: `false`.
   */
  hideSelectionColumn?: boolean;
  /**
   * When `true`, a row can be selected by clicking on it.
   * When `false`, a row can only be selected using
   * the {@link https://ant.design/components/table | selection column}.
   * Default: `true`.
   */
  canSelectRowByClick?: boolean,
  /**
   * Controls that will be rendered above the table.
   */
  buttons?: JSX.Element[],
  /**
   * Can be used to override any of the underlying
   * {@link https://ant.design/components/table/#Table | Table properties}.
   */
  tableProps?: TableProps<TEntity>,
  /**
   * @deprecated use `columnDefinitions` instead. If used together, `columnDefinitions` will take precedence.
   */
  columnProps?: ColumnProps<TEntity>,
  /**
   * Describes the columns to be displayed. An element of this array can be
   * a property name (which will render a column displaying that property;
   * the column will have the default look&feel)
   * or a {@link ColumnDefinition} object (which allows creating a custom column).
   */
  columnDefinitions: Array<string | ColumnDefinition<TEntity>>
}

export interface ColumnDefinition<TEntity> {
  /**
   * Entity property name.
   * Use it if you want to create a custom variant of the default property-bound column.
   * In this case the properties in {@link columnProps} will override the default
   * look&feel (defaults will still apply to the properties not contained in {@link columnProps}).
   * If you want to create a custom column that is not bound to an entity property
   * (e.g. an action button column or a calculated field column), do not use this prop.
   */
  field?: string,
  /**
   * If {@link field} is provided, then these properties will override the default look&feel
   * (defaults will still apply to the properties not contained in {@link columnProps}).
   * If you want to create a custom column that is not bound to an entity property
   * (e.g. an action button column or a calculated field column) use this prop only and do not use {@link field}.
   * In this case only the properties present in {@link columnProps} will be applied to the column.
   */
  columnProps: ColumnProps<TEntity>
}
class DataTableComponent<TEntity extends object> extends React.Component<DataTableProps<TEntity>> {

  selectedRowKeys: string[] = [];
  tableFilters: Record<string, any> = {};
  operatorsByProperty: Map<string, ComparisonType> = new Map();
  valuesByProperty: Map<string, CustomFilterInputValue> = new Map();

  // We need to mount and unmount several reactions (listeners) on componentDidMount/componentWillUnmount
  disposers: IReactionDisposer[] = [];

  customFilterForms: Map<string, FormInstance> = new Map<string, FormInstance>();

  constructor(props: DataTableProps<TEntity>) {
    super(props);

    const {initialFilter} = props;

    if (initialFilter) {
      this.tableFilters = graphqlFilterToTableFilters(initialFilter, this.fields);
    }

    makeObservable(this, {
      selectedRowKeys: observable,
      tableFilters: observable.ref,
      operatorsByProperty: observable,
      valuesByProperty: observable,
      fields: computed,
      paginationConfig: computed,
      handleFilterOperatorChange: action,
      handleFilterValueChange: action,
      onChange: action,
      onRowClicked: action,
      onRowSelectionColumnClicked: action,
      onRow: action,
      clearFilters: action,
      clearFiltersButton: computed,
      generateColumnProps: computed
    });

  }

  static defaultProps = {
    rowSelectionMode: 'single' as 'single' | 'multi' | 'none',
    canSelectRowByClick: true,
    hideSelectionColumn: false,
    hideClearFilters: false,
  };

  componentDidMount(): void {

    // When `data` has changed (e.g. due to sorting, filtering or pagination change) some of the selected rows
    // may not be displayed anymore and shall be removed from selectedRowKeys
    this.disposers.push(reaction(
      () => [this.props.items, this.props.loading],
      ([items, loading]: any) => { // TODO proper typing
        if (this.isRowSelectionEnabled && this.selectedRowKeys.length > 0 && !loading) {

          const displayedRowKeys = items.map((item: EntityInstance<TEntity>) => this.constructRowKey(item));

          const displayedSelectedKeys: string[] = [];

          this.selectedRowKeys.forEach((selectedKey: string) => {
            if (displayedRowKeys.indexOf(selectedKey) > -1) {
              displayedSelectedKeys.push(selectedKey);
            }
          });

          this.selectedRowKeys = displayedSelectedKeys;
        }
      }
    ));

    // Display error message if data retrieval has failed
    this.disposers.push(reaction(
      () => this.props.error,
      (error) => {
        const {intl} = this.props;
        if (error != null) {
          message.error(intl.formatMessage({id: 'common.requestFailed'}));
        }
      }
    ));

    // Call corresponding callback(s) when selectedRowKeys is changed
    this.disposers.push(reaction(
      () => this.selectedRowKeys,
      this.onRowSelectionChange
    ));

    // Clear row selection when rowSelectionMode is changed
    this.disposers.push(reaction(
      () => this.props.rowSelectionMode,
      () => {
        this.selectedRowKeys = [];
      }
    ))
  }

  componentWillUnmount(): void {
    this.disposers.forEach((dispose: IReactionDisposer) => dispose());
  }

  onRowSelectionChange = () => {
    switch (this.props.rowSelectionMode) {
      case undefined:
        throw new Error(`rowSelectionMode is not expected to be ${this.props.rowSelectionMode} at this point`);
      case 'none':
        return;
      case 'multi':
      case 'single':
        if (this.props.onRowSelectionChange) {
          this.props.onRowSelectionChange(this.selectedRowKeys);
        }
        break;
      default:
        assertNever('rowSelectionMode', this.props.rowSelectionMode);
    }
  };

  get isRowSelectionEnabled(): boolean {
    if (this.props.rowSelectionMode == null) {
      throw new Error(`rowSelectionMode is expected to be defined at this point`);
    }
    return ['single', 'multi'].indexOf(this.props.rowSelectionMode) > -1;
  }

  get fields(): string[] {

    const {columnDefinitions} = this.props;

    if (columnDefinitions != null) {
      return columnDefinitions.reduce((accumulatedFields: string[], columnDefinition: string | ColumnDefinition<TEntity>) => {
        if (typeof columnDefinition === 'string') {
          accumulatedFields.push(columnDefinition);
        } else if (typeof (columnDefinition.field === 'string')) {
          accumulatedFields.push(columnDefinition.field!);
        }
        return accumulatedFields;
      }, []);
    }

    // TODO here we probably want to return all fields in the entity
    throw new Error('not implemented');
  }

  get paginationConfig(): TablePaginationConfig {
    const {items} = this.props;

    return {
      showSizeChanger: true,
      total: items?.length ?? undefined,
    };
  }

  handleFilterOperatorChange = (operator: ComparisonType, propertyName: string) => {
    this.operatorsByProperty.set(propertyName, operator);
  };

  handleFilterValueChange = (value: CustomFilterInputValue, propertyName: string) => {
    this.valuesByProperty.set(propertyName, value);
  };

  onChange = (pagination: TablePaginationConfig, filters: Record<string, Array<Key | boolean> | null>, sorter: SorterResult<TEntity> | Array<SorterResult<TEntity>>): void => {
    this.tableFilters = filters;

    const {fields} = this;
    const {
      initialFilter,
      onFilterChange,
      defaultSortOrder,
      onSortOrderChange,
      onPaginationChange,
      entityName,
    } = this.props;
    const mainStore = this.props.mainStore!;

    handleTableChange<TEntity>({
      pagination,
      tableFilters: filters,  apiFilters: initialFilter, onFilterChange,
      sorter, onSortOrderChange, defaultSortOrder,
      fields,
      mainStore,
      entityName,
      onPaginationChange
    });
  };

  onRowClicked = (record: TEntity): void => {
    if (this.isRowSelectionEnabled) {
      const clickedRowKey = this.constructRowKey(record);

      let newSelectedRowKeys = this.selectedRowKeys.slice();

      switch (this.props.rowSelectionMode) {
        case 'multi':
          const clickedRowKeyIndex = this.selectedRowKeys.indexOf(clickedRowKey);
          if (clickedRowKeyIndex > -1) {
            // Deselect row in 'multi' mode
            newSelectedRowKeys.splice(clickedRowKeyIndex, 1);
          } else {
            // Select row in 'multi' mode
            newSelectedRowKeys.push(clickedRowKey);
          }
          break;
        case 'single':
          if (this.selectedRowKeys.length > 0 && this.selectedRowKeys[0] === clickedRowKey) {
            // Deselect row in 'single' mode
            newSelectedRowKeys = [];
          } else {
            // Select row in 'single' mode
            newSelectedRowKeys[0] = clickedRowKey;
          }
          break;
      }

      this.selectedRowKeys = newSelectedRowKeys;
    }
  };

  onRowSelectionColumnClicked = (selectedRowKeys: ReactText[]): void => {
    if (this.isRowSelectionEnabled) {
      this.selectedRowKeys = selectedRowKeys as string[];
    }
  };

  onRow = (record: TEntity): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => this.onRowClicked(record)
    }
  };

  clearFilters = (): void => {
    const {entityName, initialFilter, onFilterChange} = this.props;

    this.tableFilters = {};
    this.operatorsByProperty.clear();
    this.valuesByProperty.clear();

    this.fields.forEach((field: string) => {
      const propertyInfo = getPropertyInfoNN(field, entityName, this.props.mainStore!.metadata!);
      if (propertyInfo.type === 'boolean') {
        this.valuesByProperty.set(field, 'true');
      }
    });

    this.customFilterForms.forEach((form: FormInstance) => {
      form.resetFields(); // Reset Ant Form in CustomFilter
    });

    if (initialFilter != null) {
      const preservedConditions = getPreservedConditions(initialFilter, this.fields);

      onFilterChange(preservedConditions);
    }
    onFilterChange(undefined);
  };

  get rowSelectionType(): RowSelectionType {
    switch (this.props.rowSelectionMode) {
      case 'multi':
        return 'checkbox';
      case 'single':
        return 'radio';
      default:
        throw new Error(`rowSelectionMode is not expected to be ${this.props.rowSelectionMode} at this point`);
    }
  }

  render() {
    const { items, loading, mainStore } = this.props;

    if (mainStore?.isEntityDataLoaded() !== true) {
      return (
        <div className='cuba-data-table-loader'>
          <Spin size='large'/>
        </div>
      );
    }

    let defaultTableProps: TableProps<TEntity> = {
      loading,
      columns: this.generateColumnProps,
      dataSource: toJS(items),
      onChange: this.onChange,
      pagination: this.paginationConfig,
      rowKey: record => this.constructRowKey(record),
      scroll: {x: true}
    };

    if (this.isRowSelectionEnabled) {
      defaultTableProps = {
        ...defaultTableProps,
        rowSelection: {
          type: this.rowSelectionType,
          selectedRowKeys: toJS(this.selectedRowKeys),
          onChange: this.onRowSelectionColumnClicked,
        },
      };

      if (this.props.canSelectRowByClick) {
        defaultTableProps = {
          ...defaultTableProps,
          onRow: this.onRow,
        };
      }
    }

    const tableProps = { ...defaultTableProps, ...this.props.tableProps };

    return (
      <div className='cuba-data-table'>
        <div className='buttons'>
          {this.props.buttons}
          {this.props.hideClearFilters ? null : this.clearFiltersButton}
        </div>
        <Table { ...tableProps } className={this.props.hideSelectionColumn ? '_cuba-hide-selection-column' : ''} />
      </div>
    );
  }

  get clearFiltersButton(): ReactNode {
    if (this.isClearFiltersShown) {
      return (
        <Button htmlType='button'
                className='cuba-data-table-clear-filters'
                onClick={this.clearFilters}
                type='link'>
          <FilterOutlined />
          <span><FormattedMessage id='cubaReact.dataTable.clearAllFilters'/></span>
        </Button>
      );
    } else {
      return null;
    }
  }

  get isClearFiltersShown(): boolean {
    return Object.values(this.tableFilters).some(value => value != null);
  }

  get generateColumnProps(): Array<ColumnProps<TEntity>> {
    const {columnDefinitions, mainStore, entityName, associationOptionsMap} = this.props;

    return (columnDefinitions ?? this.fields)
      .filter((columnDef: string | ColumnDefinition<TEntity>) => {
        const {getAttributePermission} = mainStore!.security;
        const propertyName = columnDefToPropertyName(columnDef);
        if (propertyName != null) {
          const perm: EntityAttrPermissionValue = getAttributePermission(entityName, propertyName);
          return perm === 'MODIFY' || perm === 'VIEW';
        }
        return true; // Column not bound to an entity attribute
      })
      .map((columnDef: string | ColumnDefinition<TEntity>) => {
        const propertyName = columnDefToPropertyName(columnDef);
        const columnSettings = (columnDef as ColumnDefinition<TEntity>).columnProps;

        if (propertyName != null) {
          // Column is bound to an entity property

          const generatedColumnProps = generateDataColumn<TEntity>({
            propertyName,
            entityName,
            enableFilter: this.isFilterForColumnEnabled(propertyName),
            filters: this.tableFilters,
            operator: this.operatorsByProperty.get(propertyName),
            onOperatorChange: this.handleFilterOperatorChange,
            value: this.valuesByProperty.get(propertyName),
            onValueChange: this.handleFilterValueChange,
            enableSorter: true,
            mainStore: mainStore!,
            customFilterRef: (instance: FormInstance) => this.customFilterForms.set(propertyName, instance),
            associationOptions: associationOptionsMap?.get(propertyName)
          });

          return {
            ...generatedColumnProps,
            ...this.props.columnProps, // First we add customizations from columnProps TODO @deprecated
            ...(columnSettings ? columnSettings : []) // Then we add customizations from columnDefinitions
          };
        }

        if (columnSettings != null) {
          // Column is not be bound to an entity property. It is a column fully constructed by client.
          // E.g. it can be a calculated column or an action column.
          return columnSettings;
        }

        throw new Error(`Neither field name nor columnProps were provided`);
    });
  };

  isFilterForColumnEnabled(propertyName: string): boolean {
    return this.props.enableFiltersOnColumns
      ? this.props.enableFiltersOnColumns.indexOf(propertyName) > -1
      : true;
  }

  constructRowKey(record: TEntity & WithId): string {
    return getStringId(record.id!);
  }

}

function columnDefToPropertyName<E>(columnDef: string | ColumnDefinition<E>): string | undefined {
  return typeof columnDef === 'string' ? columnDef : columnDef.field;
}

const dataTable = 
  injectIntl(
    injectMainStore(
      observer(
        DataTableComponent
      )
    )
  );

export {dataTable as DataTable};

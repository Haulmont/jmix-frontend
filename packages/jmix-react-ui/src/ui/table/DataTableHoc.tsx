import React, { ReactNode, ReactText } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Button, message, Spin, Table } from 'antd';
import { ColumnProps, TableProps } from 'antd/es/table';
import { Key, RowSelectionType, SorterResult, TableCurrentDataSource, TablePaginationConfig } from 'antd/es/table/interface';
import {
  action,
  computed,
  IReactionDisposer,
  observable,
  reaction,
  toJS,
  makeObservable,
} from 'mobx';
import { observer } from 'mobx-react';
import { CustomFilterInputValue } from './DataTableCustomFilter';
import './DataTable.less';
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import {
  graphqlFilterToTableFilters,
  generateDataColumn,
  handleTableChange,
  getPreservedConditions
} from './DataTableHelpers';
import { EntityAttrPermissionValue } from "@haulmont/jmix-rest";
import {
  MainStoreInjected,
  injectMainStore,
  assertNever,
  getPropertyInfoNN,
  WithId,
  EntityInstance,
  injectMetadata,
  MetadataInjected,
  toIdString,
  isRelationProperty,
  HasId,
  MayHaveInstanceName,
  getPropertyInfo,
  dollarsToUnderscores,
  PaginationChangeCallback,
  JmixSortOrder,
  SortOrderChangeCallback,
  ComparisonType,
  FilterChangeCallback,
  JmixEntityFilter,
  PropertyType
} from '@haulmont/jmix-react-core';
import { FormInstance } from 'antd/es/form';
import { ApolloError } from "@apollo/client";

/**
 * @typeparam TEntity - entity type.
 */
interface DataTableProps extends MainStoreInjected, MetadataInjected, WrappedComponentProps {

  items?: object[];
  count?: number;
  relationOptions?: Map<string, Array<HasId & MayHaveInstanceName>>;
  current?: number;
  pageSize?: number;
  loading: boolean;
  error?: ApolloError;
  /**
   * Initial state of table filters.
   * Can be used to set a filtering condition on an entity attribute that is not displayed.
   */
  initialFilter?: JmixEntityFilter[];
  onFilterChange: FilterChangeCallback;
  defaultSortOrder?: JmixSortOrder;
  onSortOrderChange: SortOrderChangeCallback;
  onPaginationChange: PaginationChangeCallback;
  entityName: string;

  /**
   * Names of columns that should have filters enabled.
   * Default: filters will be enabled on all columns. Pass empty array to disable all filters.
   */
  enableFiltersOnColumns?: string[],
  enableSortingOnColumns?: string[],
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
  tableProps?: TableProps<object>,
  /**
   * @deprecated use `columnDefinitions` instead. If used together, `columnDefinitions` will take precedence.
   */
  columnProps?: ColumnProps<object>,
  /**
   * Describes the columns to be displayed. An element of this array can be
   * a property name (which will render a column displaying that property;
   * the column will have the default look&feel)
   * or a {@link ColumnDefinition} object (which allows creating a custom column).
   */
  columnDefinitions: Array<string | ColumnDefinition>
}

interface ColumnDefinition {
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
  columnProps: ColumnProps<object>
}
class DataTableComponent extends React.Component<DataTableProps, any> {

  selectedRowKeys: string[] = [];
  tableFilters: Record<string, any> = {};
  operatorsByProperty: Map<string, ComparisonType> = new Map();
  valuesByProperty: Map<string, CustomFilterInputValue> = new Map();

  // We need to mount and unmount several reactions (listeners) on componentDidMount/componentWillUnmount
  disposers: IReactionDisposer[] = [];

  customFilterForms: Map<string, FormInstance> = new Map<string, FormInstance>();

  constructor(props: DataTableProps) {
    super(props);

    const { initialFilter } = props;

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
      () => [this.items, this.props.loading],
      ([items, loading]: any) => { // TODO proper typing
        if (this.isRowSelectionEnabled && this.selectedRowKeys.length > 0 && !loading) {

          const displayedRowKeys = items.map((item: EntityInstance<object>) => this.constructRowKey(item));

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
        const { intl } = this.props;
        if (error != null) {
          message.error(intl.formatMessage({ id: 'common.requestFailed' }));
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

  get items(): object[] {
    const { items } = this.props;
    return items ?? [];
  }

  get total(): number {
    const { count } = this.props;
    return count ?? 0;
  }

  get fields(): string[] {

    const { columnDefinitions } = this.props;

    if (columnDefinitions != null) {
      return columnDefinitions.reduce((accumulatedFields: string[], columnDefinition: string | ColumnDefinition) => {
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
    const { current, pageSize } = this.props;

    return {
      showSizeChanger: true,
      total: this.total,
      pageSize,
      current
    };
  }

  getRelationOptions(attrName: string): Array<HasId & MayHaveInstanceName> {
    const { relationOptions, entityName, metadata } = this.props;

    if (relationOptions == null) {
      return [];
    }

    const nestedEntityName = getPropertyInfo(metadata.entities, entityName, attrName)?.type;
    if (nestedEntityName == null) {
      return [];
    }

    return relationOptions.get(dollarsToUnderscores(nestedEntityName)) ?? [];
  }

  handleFilterOperatorChange = (operator: ComparisonType, propertyName: string) => {
    this.operatorsByProperty.set(propertyName, operator);
  };

  handleFilterValueChange = (value: CustomFilterInputValue, propertyName: string) => {
    this.valuesByProperty.set(propertyName, value);
  };

  onChange = (
    pagination: TablePaginationConfig, 
    filters: Record<string, Array<Key | boolean> | null>, 
    sorter: SorterResult<object> | Array<SorterResult<object>>,
    extra: TableCurrentDataSource<object>
  ): void => {
    const {action: tableAction} = extra;
    this.tableFilters = filters;

    const {fields} = this;
    const {
      initialFilter,
      onFilterChange,
      defaultSortOrder,
      onSortOrderChange,
      onPaginationChange,
      entityName,
      metadata
    } = this.props;

    handleTableChange<object>({
      pagination,
      tableFilters: filters,  apiFilters: initialFilter, onFilterChange,
      sorter, onSortOrderChange, defaultSortOrder,
      fields,
      metadata,
      entityName,
      onPaginationChange,
      tableAction
    });
  }

  onRowClicked = (record: object): void => {
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

  onRow = (record: object): React.HTMLAttributes<HTMLElement> => {
    return {
      onClick: () => this.onRowClicked(record)
    }
  };

  clearFilters = (): void => {
    const { entityName, initialFilter, onFilterChange } = this.props;

    this.tableFilters = {};
    this.operatorsByProperty.clear();
    this.valuesByProperty.clear();

    this.fields.forEach((field: string) => {
      const propertyInfo = getPropertyInfoNN(field, entityName, this.props.metadata.entities);
      if ((propertyInfo.type as PropertyType) === 'Boolean') {
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
    const { loading, mainStore } = this.props;

    if (mainStore?.isEntityDataLoaded() !== true) {
      return (
        <div className='cuba-data-table-loader'>
          <Spin size='large' />
        </div>
      );
    }

    let defaultTableProps: TableProps<object> = {
      loading,
      columns: this.generateColumnProps,
      dataSource: this.items,
      onChange: this.onChange,
      pagination: this.paginationConfig,
      rowKey: record => this.constructRowKey(record),
      scroll: { x: true }
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
        <Table {...tableProps} className={this.props.hideSelectionColumn ? '_cuba-hide-selection-column' : ''} />
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
          <span><FormattedMessage id='jmix.dataTable.clearAllFilters' /></span>
        </Button>
      );
    } else {
      return null;
    }
  }

  get isClearFiltersShown(): boolean {
    return Object.values(this.tableFilters).some(value => value != null);
  }

  get generateColumnProps(): Array<ColumnProps<object>> {
    const { columnDefinitions, mainStore, entityName } = this.props;

    return (columnDefinitions ?? this.fields)
      .filter((columnDef: string | ColumnDefinition) => {
        const { getAttributePermission } = mainStore!.security;
        const propertyName = columnDefToPropertyName(columnDef);
        if (propertyName != null) {
          const perm: EntityAttrPermissionValue = getAttributePermission(entityName, propertyName);
          return perm === 'MODIFY' || perm === 'VIEW';
        }
        return true; // Column not bound to an entity attribute
      })
      .map((columnDef: string | ColumnDefinition) => {
        const propertyName = columnDefToPropertyName(columnDef);
        const columnSettings = (columnDef as ColumnDefinition).columnProps;

        if (propertyName != null) {
          // Column is bound to an entity property

          const generatedColumnProps = generateDataColumn<object>({
            propertyName,
            entityName,
            enableFilter: this.isFilterForColumnEnabled(propertyName),
            filters: this.tableFilters,
            operator: this.operatorsByProperty.get(propertyName),
            onOperatorChange: this.handleFilterOperatorChange,
            value: this.valuesByProperty.get(propertyName),
            onValueChange: this.handleFilterValueChange,
            enableSorter: this.isSortingForColumnEnabled(propertyName),
            mainStore: mainStore!,
            customFilterRef: (instance: FormInstance) => this.customFilterForms.set(propertyName, instance),
            relationOptions: this.getRelationOptions(propertyName)
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

  isSortingForColumnEnabled(propertyName: string): boolean {
    const { enableSortingOnColumns, metadata, entityName } = this.props;

    const propertyInfo = getPropertyInfo(metadata.entities, entityName, propertyName);
    if (propertyInfo != null && isRelationProperty(propertyInfo)) {
      // Sorting on Association and Composition fields is disabled
      // because it is currently not possible to sort by instance name
      return false;
    }

    return enableSortingOnColumns
      ? enableSortingOnColumns.indexOf(propertyName) > -1
      : true;
  }

  constructRowKey(record: object & WithId): string {
    return toIdString(record.id!);
  }

}

function columnDefToPropertyName(columnDef: string | ColumnDefinition): string | undefined {
  return typeof columnDef === 'string' ? columnDef : columnDef.field;
}

const DataTable =
  injectIntl(
    injectMainStore(
      injectMetadata(
        observer(
          DataTableComponent
        )
      )
    )
  );

type TableContainerProps= {
    data: Data
  }

function withTableData(data: Data) {
  return function <Props extends Data =  DataTableProps & Data>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> {
    return (props: Props) => {
      return (
        <WrappedComponent
          data={data}
          {...props}
        />
      )
    }
  }
}

function DataTableContainer(props: TableContainerProps & DataTableProps) {
  const {data, ...restProps} = props;
  const {
    items,
    count,
    relationOptions,
    loading,
    error,
    handleSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handlePaginationChange,
    columnDefinitions
  } = data;
  return (
    <DataTable
      {...restProps}
      items={items}
      count={count}
      relationOptions={relationOptions}
      loading={loading}
      error={error}
      columnDefinitions={columnDefinitions}
      onRowSelectionChange={handleSelectionChange}
      onFilterChange={handleFilterChange!}
      onSortOrderChange={handleSortOrderChange!}
      onPaginationChange={handlePaginationChange!}
    />
  )
}

type Data = {
  items? : object[],
  count?: number,
  relationOptions?: Map<string, Array<HasId & MayHaveInstanceName>>;
  handleSelectionChange? : (selectedEntityIds: string[]) => void,
  handleFilterChange: FilterChangeCallback,
  handleSortOrderChange: SortOrderChangeCallback,
  handlePaginationChange: PaginationChangeCallback,
  loading: boolean;
  error?: ApolloError;
  columnDefinitions:  (string | ColumnDefinition)[]
}


export { DataTable as DataTableHoc, withTableData,  DataTableContainer, ColumnDefinition as ColumnDefinitionHoc, DataTableProps as DataTablePropsHoc};

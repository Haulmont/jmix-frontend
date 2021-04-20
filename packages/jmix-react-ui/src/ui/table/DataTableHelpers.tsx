import {ColumnProps, TablePaginationConfig} from 'antd/es/table';
import {SorterResult, ColumnFilterItem, FilterDropdownProps} from 'antd/es/table/interface';
import React, { ReactText } from 'react';
import {
  EnumInfo,
  EnumValueInfo,
  MetaPropertyInfo
} from '@haulmont/jmix-rest';
import {DataTableCell} from './DataTableCell';
import {
  ComparisonType,
  DataTableCustomFilter as CustomFilter,
} from './DataTableCustomFilter';
import { toJS } from 'mobx';
import { MainStore, getPropertyInfoNN, getPropertyCaption, isPropertyTypeSupported, HasId, MayHaveInstanceName } from '@haulmont/jmix-react-core';
import {Key} from 'antd/es/table/interface';
import { FormInstance } from 'antd/es/form';
import {
  FilterChangeCallback,
  PaginationChangeCallback,
  SortOrderChangeCallback
} from "./DataTable";
import { convertPaginationAntd2Jmix } from '../../antd-specific/pagination';
import {JmixEntityFilter, JmixSortOrder} from "../../crud/interfaces";

// todo we should not use '*Helpers' in class name in case of lack semantic. This class need to be split
//  to different files like 'DataColumn', 'Conditions', 'Filters', 'Paging' ot something like this
//  https://github.com/cuba-platform/frontend/issues/133

export interface DataColumnConfig {
  propertyName: string;
  entityName: string;
  /**
   * Whether to enable a filter for this column
   */
  enableFilter: boolean;
  /**
   * An object received in antd {@link https://ant.design/components/table | Table}'s `onChange` callback,
   * it is a mapping between column names and currently applied filters.
   */
  filters: Record<string, any> | undefined;
  /**
   * See {@link DataTableCustomFilterProps.operator}
   */
  operator: ComparisonType | undefined;
  onOperatorChange: (operator: ComparisonType, propertyName: string) => void;
  /**
   * See {@link DataTableCustomFilterProps.value}
   */
  // TODO probably type should be changed to CustomFilterInputValue
  value: any;
  onValueChange: (value: any, propertyName: string) => void;
  /**
   * Whether to enable sorting on this column
   */
  enableSorter: boolean;
  mainStore: MainStore;
  /**
   * See {@link DataTableCustomFilterProps.customFilterRef}
   */
  customFilterRef?: (instance: FormInstance) => void;
  associationOptions?: Array<HasId & MayHaveInstanceName>;
}

/**
 * @remarks
 * It is possible to create a vanilla antd `Table` and customize some of its columns
 * with `DataTable`'s custom filters using this helper function.
 *
 * NOTE: it might be simpler to achieve the desired result using {@link DataTableProps.columnDefinitions}.
 *
 * @param config
 *
 * @example
 * ```typescript jsx
 *  import * as React from "react";
 *  import {action, observable} from 'mobx';
 *  import {observer} from "mobx-react";
 *  import {Table,} from "antd";
 *  import {Car} from "../../cuba/entities/mpg$Car";
 *  import {
 *   collection, injectMainStore, MainStoreInjected,
 *   generateDataColumn, ComparisonType, handleTableChange,
 * } from "@cuba-platform/react";
 *  import {injectIntl, WrappedComponentProps} from 'react-intl';
 *  import {PaginationConfig} from 'antd/es/pagination';
 *  import { SorterResult } from "antd/es/table";
 *
 *  @injectMainStore
 *  @observer
 *  class CarTableComponent extends React.Component<MainStoreInjected & WrappedComponentProps> {
 *
 *   dataCollection = collection<Car>(Car.NAME, {view: 'car-edit', sort: '-updateTs'});
 *
 *   fields = ['purchaseDate','price','regNumber'];
 *
 *   @observable.ref filters: Record<string, string[]> | undefined;
 *   @observable operator: ComparisonType | undefined;
 *   @observable value: any;
 *
 *   @action
 *   handleOperatorChange = (operator: ComparisonType) => this.operator = operator;
 *
 *   @action
 *   handleValueChange = (value: any) => this.value = value;
 *
 *   @action
 *   handleChange = (pagination: PaginationConfig, tableFilters: Record<string, string[]>, sorter: SorterResult<Car>): void => {
 *     this.filters = tableFilters;
 *
 *     handleTableChange({
 *       pagination: pagination,
 *       filters: tableFilters,
 *       sorter: sorter,
 *       defaultSort: '-updateTs',
 *       fields: this.fields,
 *       mainStore: this.props.mainStore!,
 *       dataCollection: this.dataCollection
 *     });
 *   };
 *
 *   render() {
 *
 *     return (
 *       <Table
 *         dataSource={this.dataCollection.items.slice()}
 *         columns={[
 *           { title: 'Purchase Date', dataIndex: 'purchaseDate', key: 'purchaseDate', render: (text: any) => <b>{text}</b> },
 *           { title: 'Price', dataIndex: 'price', key: 'price' },
 *           generateDataColumn({
 *             propertyName: 'regNumber',
 *             entityName: this.dataCollection.entityName,
 *             filters: this.filters,
 *             operator: this.operator,
 *             onOperatorChange: this.handleOperatorChange,
 *             value: this.value,
 *             onValueChange: this.handleValueChange,
 *             enableSorter: true,
 *             mainStore: this.props.mainStore!
 *           })
 *         ]}
 *         onChange={this.handleChange}
 *         pagination={{
 *           showSizeChanger: true,
 *           total: this.dataCollection.count,
 *         }}
 *       />
 *     );
 *   }
 *
 * }
 *
 *  const CarTable = injectIntl(CarTableComponent);
 *
 *  export default CarTable;
 *  ```
 *
 */
// todo refactor - extract DataColumn class
export function generateDataColumn<EntityType>(config: DataColumnConfig): ColumnProps<EntityType> {
  const {
    propertyName,
    entityName,
    enableFilter,
    filters,
    operator,
    onOperatorChange,
    value,
    onValueChange,
    enableSorter,
    mainStore,
    customFilterRef,
    associationOptions
  } = config;

  let dataIndex: string | string[];
  const propertyInfo = getPropertyInfoNN(propertyName as string, entityName, mainStore!.metadata!);

  switch(propertyInfo.attributeType) {
    case 'COMPOSITION':
    case 'ASSOCIATION':
      dataIndex = [propertyName, '_instanceName'];
      break;
    default:
      dataIndex = propertyName as string;
  }

  const localizedPropertyCaption = getPropertyCaption(propertyName as string, entityName, mainStore!.messages!);

  let defaultColumnProps: ColumnProps<EntityType> = {
    title: (
      <div
        title={localizedPropertyCaption}>
          {localizedPropertyCaption}
        </div>
      ),
    dataIndex,
    sorter: enableSorter,
    key: propertyName as string,
    render: (text, record) => DataTableCell<EntityType>({propertyInfo, text, mainStore, record})
  };

  if (enableFilter && isPropertyTypeSupported(propertyInfo)) {
    defaultColumnProps = {
      ...defaultColumnProps,
      // According to the typings this field expects any[] | undefined
      // However, in reality undefined makes the filter icon to be highlighted.
      // If we want the icon to not be highlighted we need to pass null instead.
      // @ts-ignore
      filteredValue: (filters && filters[propertyName])
        ? toJS(filters[propertyName])
        : null,
    };

    if (propertyInfo.attributeType === 'ENUM') {
      defaultColumnProps = {
        filters: generateEnumFilter(propertyInfo, mainStore),
        ...defaultColumnProps
      };
    } else {
      defaultColumnProps = {
        filterDropdown: generateCustomFilterDropdown(
          propertyName as string,
          entityName,
          operator,
          onOperatorChange,
          value,
          onValueChange,
          customFilterRef,
          associationOptions
        ),
        ...defaultColumnProps
      };
    }
  }

  return defaultColumnProps;
}

/**
 * Generates a standard antd table column filter for enum fields.
 *
 * @param propertyInfo
 * @param mainStore
 */
export function generateEnumFilter(propertyInfo: MetaPropertyInfo, mainStore: MainStore): ColumnFilterItem[] {
  const propertyEnumInfo: EnumInfo | undefined = mainStore!.enums!
    .find((enumInfo: EnumInfo) => enumInfo.name === propertyInfo.type);

  if (!propertyEnumInfo) {
    return [];
  }

  return propertyEnumInfo.values.map((enumValueInfo: EnumValueInfo) => {
    return {
      text: enumValueInfo.caption,
      value: enumValueInfo.name
    };
  });
}

// todo - after extraction DataColumn class move this method to DataColumn and inline
export function generateCustomFilterDropdown(
  propertyName: string,
  entityName: string,
  operator: ComparisonType | undefined,
  onOperatorChange: (operator: ComparisonType, propertyName: string) => void,
  value: any,
  onValueChange: (value: any, propertyName: string) => void,
  customFilterRefCallback?: (instance: FormInstance) => void,
  associationOptions?: any,
): (props: FilterDropdownProps) => React.ReactNode {

  return (props: FilterDropdownProps) => (
    <CustomFilter entityName={entityName}
                  entityProperty={propertyName}
                  filterProps={props}
                  operator={operator}
                  onOperatorChange={onOperatorChange}
                  value={value}
                  onValueChange={onValueChange}
                  customFilterRef={customFilterRefCallback}
                  associationOptions={associationOptions}
    />
  )

}

// TODO docs
/**
 * Sets filters on provided `dataCollection` based on current state of table filters
 *
 * @param tableFilters
 * @param fields
 * @param mainStore
 * @param dataCollection
 */
export function setFilters(
  tableFilters: Record<string, Array<ReactText | boolean> | null>,
  apiFilters: JmixEntityFilter,
  onFilterChange: FilterChangeCallback,
  entityName: string,
  fields: string[],
  mainStore: MainStore,
) {
  let nextApiFilters: JmixEntityFilter = {};

  if (Object.keys(apiFilters).length > 0) {

    // We check which of the current API filter conditions needs to be preserved regardless of table filters state.
    // Particularly we preserve filters on columns that are not displayed.
    // TODO proper type
    const preservedConditions: JmixEntityFilter = getPreservedConditions(apiFilters, fields);

    if (preservedConditions.length > 0) {
      nextApiFilters = {
        ...nextApiFilters,
        ...preservedConditions
      };
    }
  }

  // Now we modify API filters based on the state of table filters
  if (tableFilters) {
    fields.forEach((propertyName: string) => {
      if (tableFilters.hasOwnProperty(propertyName)
          && tableFilters[propertyName] != null
          && tableFilters[propertyName]!.length > 0) {

        const propertyInfoNN = getPropertyInfoNN(propertyName as string, entityName, mainStore.metadata!);
        if (propertyInfoNN.attributeType === 'ENUM') {
          nextApiFilters[propertyName] = {_in: tableFilters[propertyName]};
        } else {
          const {operator, value} = JSON.parse(String(tableFilters[propertyName]![0]));
          if (operator === '__inInterval') {
            const {minDate, maxDate} = value;
            nextApiFilters[propertyName] = {'_gte': minDate};
            nextApiFilters[propertyName] = {'_lte': maxDate};
          } else {
            nextApiFilters[propertyName] = {[operator]: value};
          }
        }
      }
    });
  }

  onFilterChange(nextApiFilters);
}

// TODO docs
/**
 * Sets sort field/order on provided `dataCollection` based on current state of table `sorter`.
 *
 * @param sorter
 * @param defaultSort name of the field to be sorted by. If the name is preceeding by the '+' character, then the sort order is ascending,
 * if by the '-' character then descending. If there is no special character before the property name, then ascending sort will be used.
 * @param dataCollection
 */
// todo could we make defaultSort of type defined as properties keys of 'E' ?
export function setSorter<E>(sorter: SorterResult<E> | Array<SorterResult<E>>, onSortOrderChange: SortOrderChangeCallback, defaultSort?: JmixSortOrder) {
  if (sorter != null && !Array.isArray(sorter) && sorter.order != null) {
    const sortDirection: 'ASC' | 'DESC' = (sorter.order === 'descend') ? 'DESC' : 'ASC';

    let sortField: string;
    if (typeof sorter.field === 'string' && sorter.field.endsWith('._instanceName')) {
      sortField = sorter.field.substring(0, sorter.field.indexOf('.'));
    } else {
      sortField = String(sorter.field);
    }

    onSortOrderChange({[sortField]: sortDirection});
  } else {
    onSortOrderChange(defaultSort);
  }
}

/**
 * @typeparam E - entity type
 */
export interface TableChangeShape<E> {
  /**
   * Received in antd {@link https://ant.design/components/table | Table}'s `onChange` callback
   */
  pagination: TablePaginationConfig,
  /**
   * Received in antd {@link https://ant.design/components/table | Table}'s `onChange` callback
   */
  tableFilters: Record<string, Array<Key | boolean> | null>,
  apiFilters: JmixEntityFilter;
  onFilterChange: FilterChangeCallback;
  /**
   * Received in antd {@link https://ant.design/components/table | Table}'s `onChange` callback
   */
  sorter: SorterResult<E> | Array<SorterResult<E>>,
  /**
   * Default sort order.
   */
  defaultSortOrder?: JmixSortOrder,
  onSortOrderChange: SortOrderChangeCallback,
  onPaginationChange: PaginationChangeCallback,
  /**
   * Names of the entity properties that should be displayed.
   */
  fields: string[],
  mainStore: MainStore,
  entityName: string;
}

/**
 * When called from antd {@link https://ant.design/components/table | Table}'s `onChange` callback
 * this function will reload data collection taking into account `Table`'s filters, sorter and pagination.
 *
 * @typeparam E - entity type.
 *
 * @param tableChange
 */
export function handleTableChange<E>(tableChange: TableChangeShape<E>): void {
  const {
    pagination,
    tableFilters,
    apiFilters,
    onFilterChange,
    sorter,
    defaultSortOrder,
    onSortOrderChange,
    onPaginationChange,
    fields,
    mainStore,
    entityName
  } = tableChange;

  setFilters(tableFilters, apiFilters, onFilterChange, entityName, fields, mainStore);
  setSorter(sorter, onSortOrderChange, defaultSortOrder);
  onPaginationChange(convertPaginationAntd2Jmix(pagination));
}

// TODO docs
export function graphqlFilterToTableFilters(initialFilter: JmixEntityFilter, fields?: string[]): Record<string, any> {
  const tableFilters: Record<string, any> = {};

  Object.entries(initialFilter).forEach(([propertyName, condition]) => {
    if (!fields || fields.indexOf(propertyName)) {
      tableFilters[propertyName] = [JSON.stringify({
        operator: Object.keys(condition)[0],
        value: Object.values(condition)[0]
      })];
    }
  });

  return tableFilters;
}

export function getPreservedConditions(filters: JmixEntityFilter, fields: string[]): JmixEntityFilter {
  return Object.keys(filters)
    .filter((attrName: string) => fields.indexOf(attrName) === -1) // filter attributes that are not displayed
    .reduce((preservedFilters: JmixEntityFilter, attrName: string) => {
      preservedFilters[attrName] = filters[attrName];
      return preservedFilters;
    }, {});
}

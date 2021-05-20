import React, {ReactNode, ReactNodeArray} from 'react';
import { Form } from 'antd';
import { Button, Divider, Input, Select } from 'antd';
import {FilterDropdownProps} from 'antd/es/table/interface';
import {observer} from 'mobx-react';
import {NumericPropertyType, PropertyType} from '@haulmont/jmix-rest';
import { action, computed, makeObservable } from 'mobx';
import {Dayjs} from 'dayjs';
import {DataTableListEditor} from './DataTableListEditor';
import {DataTableIntervalEditor, TemporalInterval} from './DataTableIntervalEditor';
import './DataTableCustomFilter.less';
import './DataTableFilterControlLayout.less';
import {injectIntl, WrappedComponentProps, FormattedMessage} from 'react-intl';
import {
  MainStoreInjected,
  injectMainStore,
  getPropertyInfo,
  assertNever,
  applyDataTransferFormat,
  injectMetadata,
  MetadataInjected,
  MetaPropertyInfo,
  HasId,
  MayHaveInstanceName,
  toIdString,
} from '@haulmont/jmix-react-core';
import {IntegerInput} from "../form/IntegerInput";
import {BigDecimalInput} from "../form/BigDecimalInput";
import {DoubleInput} from "../form/DoubleInput";
import {LongInput} from "../form/LongInput";
import {UuidInput} from '../form/UuidInput';
import {CharInput} from '../form/CharInput';
import {uuidPattern} from "../../util/regex";
import {LabeledValue} from "antd/es/select";
import {wrapInFormItem, getDefaultFilterFormItemProps} from './DataTableCustomFilterFields';
import { FormInstance, FormItemProps } from 'antd/es/form';
import {
  ComparisonType,
  NumberComparisonType,
  TemporalComparisonType,
  TextComparisonType,
  UuidComparisonType
} from '../../crud/filter';
import {DatePicker} from '../DatePicker';
import {TimePicker} from '../TimePicker';

export interface CaptionValuePair {
  caption: string;
  value: string | number | undefined;
}

export type CustomFilterInputValue = string | number | boolean | string[] | number[] | TemporalInterval | null | undefined;

export interface DataTableCustomFilterProps extends MainStoreInjected, MetadataInjected {
  entityName: string,
  entityProperty: string,
  /**
   * See `filterDropdown` in antd {@link https://ant.design/components/table/#Column | Column} documentation
   */
  filterProps: FilterDropdownProps,
  /**
   * Selected comparison operator (see {@link ComparisonType}). Used together with the {@link value} prop.
   * E.g. filtering values greater than `100` can be achieved by using {@link operator} `>` and {@link value} `100`.
   * {@link operator} and {@link value} state is lifted up from the custom filter component
   * in order to allow operations on all filters at once, such as clearing all filters.
   */
  operator: ComparisonType | undefined,
  onOperatorChange: (operator: ComparisonType, propertyName: string) => void,
  /**
   * Filter value that is used together with the {@link operator} prop.
   * E.g. filtering values greater than `100` can be achieved by using {@link operator} `>` and {@link value} `100`.
   * {@link operator} and {@link value} state is lifted up from the custom filter component
   * in order to allow operations on all filters at once, such as clearing all filters.
   */
  value: CustomFilterInputValue,
  onValueChange: (value: CustomFilterInputValue, propertyName: string) => void,
  customFilterRef?: (formInstance: FormInstance) => void
  associationOptions?: Array<HasId & MayHaveInstanceName>;
}

enum OperatorGroup {
  SINGLE_VALUE = 'singleValue',
  LIST_VALUE = 'listValue',
  LOGICAL_VALUE = 'logicalValue',
  INTERVAL_VALUE = 'intervalValue',
}
class DataTableCustomFilterComponent extends React.Component<DataTableCustomFilterProps & WrappedComponentProps> {

  get nestedEntityOptions(): CaptionValuePair[] {
    const {associationOptions = []} = this.props;

    return associationOptions.map(instance => ({
      caption: instance._instanceName ?? toIdString(instance.id),
      value: toIdString(instance.id)
    }));
  }

  formInstance: FormInstance | undefined | null;

  set operator(operator: ComparisonType) {
    const oldOperator: ComparisonType = this.operator;
    this.props.onOperatorChange(operator, this.props.entityProperty);
    this.checkOperatorGroup(operator, oldOperator);
  }

  get operator(): ComparisonType {
    return this.props.operator || this.getDefaultOperator();
  }

  set value(value: CustomFilterInputValue) {
    this.props.onValueChange(value, this.props.entityProperty);
  }

  get value(): CustomFilterInputValue {
    return this.props.value;
  }

  constructor(props: DataTableCustomFilterProps & WrappedComponentProps) {
    super(props);

    makeObservable(this, {
      nestedEntityOptions: computed,
      propertyCaption: computed,
      propertyInfoNN: computed,
      handleFinish: action,
      resetFilter: action,
      changeOperator: action,
      onTextInputChange: action,
      onNumberInputChange: action,
      onTemporalPickerChange: action,
      onYesNoSelectChange: action,
      onSelectChange: action,
      operatorTypeOptions: computed,
      simpleFilterEditor: computed,
      complexFilterEditor: computed,
      conditionInput: computed,
      textInputField: computed,
      charInputField: computed,
      uuidInputField: computed,
      selectField: computed,
      selectFieldOptions: computed,
      yesNoSelectField: computed,
      listEditor: computed,
      intervalEditor: computed,
      datePickerField: computed,
      timePickerField: computed,
      dateTimePickerField: computed
    });

    this.initValue();
  }

  get errorContext(): string {
    return `[DataTableCustomFilter, entity: ${this.props.entityName}, property: ${this.props.entityProperty}]`;
  }

  get propertyCaption(): string {
    return this.props.mainStore!.messages![this.props.entityName + '.' + this.props.entityProperty];
  }

  get propertyInfoNN(): MetaPropertyInfo {
    const propertyInfo: MetaPropertyInfo | null = getPropertyInfo(
      this.props.metadata.entities,
      this.props.entityName,
      this.props.entityProperty);

    if (!propertyInfo) 
      throw new Error(`${this.errorContext} Cannot find MetaPropertyInfo`);
    

    return propertyInfo;
  }

  handleFinish = (): void => {
    if (this.value != null) {
      const {filterProps} = this.props;

      filterProps.setSelectedKeys!(
        [
          JSON.stringify({
            operator: this.operator,
            value: this.value
          })
        ]
      );
      filterProps.confirm!();
    }
  };

  setFormRef = (formInstance: FormInstance | null) => {
    const {customFilterRef} = this.props;
    if ((customFilterRef != null) && (formInstance != null)) 
      customFilterRef(formInstance);
    
    this.formInstance = formInstance;
  };

  resetFormFields = (newOperator: ComparisonType) => {
    if (this.formInstance != null) {
      const fieldsToReset: string[] = [];
      if (!isComplexOperator(newOperator)) 
        fieldsToReset.push(`${this.props.entityProperty}_input`);
      else if (newOperator === '__inInterval') 
        fieldsToReset.push(
          `${this.props.entityProperty}_predefined`,
          `${this.props.entityProperty}_number`,
        );
      
      if (fieldsToReset.length > 0) 
        this.formInstance.resetFields(fieldsToReset);
      
    }
  };

  initValue = (operator: ComparisonType = this.operator): void => {
    if (operator === '_isNull') 
      this.value = false;
    else if (this.propertyInfoNN.type === 'boolean') 
      this.value = true;
    else if (operator === '_in' || operator === '_notIn') 
      this.value = [];
    else 
      this.value = undefined;
    
  };

  resetFilter = (): void => {
    const {filterProps} = this.props;

    this.formInstance?.resetFields();
    this.operator = this.getDefaultOperator();

    filterProps.clearFilters!();
  };

  changeOperator = (newOperator: ComparisonType): void => {
    this.operator = newOperator;
  };

  checkOperatorGroup = (newOperator: ComparisonType, oldOperator: ComparisonType): void => {
    const oldOperatorGroup: OperatorGroup = determineOperatorGroup(oldOperator);
    const newOperatorGroup: OperatorGroup = determineOperatorGroup(newOperator);

    if (oldOperatorGroup !== newOperatorGroup) {
      this.resetFormFields(newOperator);
      this.initValue(newOperator);
    }
  };

  onTextInputChange = (event: any): void => {
    this.value = event.target.value;
  };

  onNumberInputChange = (value: string | number | null | undefined): void => {
    this.value = value;
  };

  onTemporalPickerChange = (value: Dayjs | null) => {
    if (value != null) 
      this.value = applyDataTransferFormat(value.millisecond(0), this.propertyInfoNN.type as PropertyType);
    
  }

  onYesNoSelectChange = (value: string | number | LabeledValue): void => {
    this.value = (value === 'true');
  };

  onSelectChange = (value: string | number | LabeledValue): void => {
    this.value = value as string;
  };

  render() {
    return (
      <Form layout='inline' onFinish={this.handleFinish} ref={this.setFormRef}>
        <div className='cuba-table-filter'>
          <div className='settings'>
            <div className='cuba-filter-controls-layout'>
              <Form.Item className='filtercontrol -property-caption'>
                {this.propertyCaption}
              </Form.Item>
              <Form.Item className='filtercontrol'
                initialValue={this.getDefaultOperator()}
                name={`${this.props.entityProperty}_operatorsDropdown`}
              >
                <Select
                  dropdownClassName={`cuba-operator-dropdown-${this.props.entityProperty}`}
                  dropdownMatchSelectWidth={false}
                  onChange={(operator: ComparisonType) => this.changeOperator(operator)}
                >
                  {this.operatorTypeOptions}
                </Select>
              </Form.Item>
              {this.simpleFilterEditor}
            </div>
            {this.complexFilterEditor}
          </div>
          <Divider className='divider' />
          <div className='footer'>
            <Button htmlType='submit'
              type='link'>
              <FormattedMessage id='cubaReact.dataTable.ok'/>
            </Button>
            <Button
              htmlType='button'
              type='link'
              onClick={this.resetFilter}>
              <FormattedMessage id='cubaReact.dataTable.reset'/>
            </Button>
          </div>
        </div>
      </Form>
    );
  }

  getDefaultOperator(): ComparisonType {
    const propertyInfo: MetaPropertyInfo = this.propertyInfoNN;

    switch (propertyInfo.attributeType) {
    case 'ENUM':
    case 'ASSOCIATION':
    case 'COMPOSITION':
      return '_eq';
    }

    switch (propertyInfo.type as PropertyType) {
    case 'boolean':
      return '_eq';
    case 'date':
    case 'time':
    case 'dateTime':
    case 'localDate':
    case 'localTime':
    case 'localDateTime':
    case 'offsetDateTime':
    case 'offsetTime':
      return '_eq';
    case 'int':
    case 'double':
    case 'decimal':
    case 'long':
    case 'char':
      return '_eq';
    case 'string':
      return '_contains';
    case 'uuid':
      return '_eq';
    default:
      throw new Error(`${this.errorContext} Unexpected property type ${propertyInfo.type} when trying to get the default condition operator`)
    }
  }

  get operatorTypeOptions(): ReactNode {
    const propertyInfo: MetaPropertyInfo = this.propertyInfoNN;

    const availableOperators: ComparisonType[] = getAvailableOperators(propertyInfo);

    return availableOperators.map((operator: ComparisonType) => {
      return <Select.Option key={`${this.props.entityProperty}.${operator}`}
        className={operatorToOptionClassName(operator)}
        value={operator}>
        {this.getOperatorCaption(operator)}
      </Select.Option>;
    });
  }

  getOperatorCaption = (operator: ComparisonType): string => {
    switch (operator) {
    case '_eq':
      return '=';
    case '_gt':
      return '>';
    case '_gte':
      return '>=';
    case '_lt':
      return '<';
    case '_lte':
      return '<=';
    case '_neq':
      return '<>';
    case '_startsWith':
    case '_endsWith':
    case '_contains':
      // case '_doesNotContain':
    case '_in':
    case '_notIn':
    case '_isNull':
    case '__inInterval':
      return this.props.intl.formatMessage({ id: 'cubaReact.dataTable.operator.' + operator });
    default:
      throw new Error(`${this.errorContext} Unexpected condition operator ${operator} when trying to get operator caption`);
    }
  };

  get simpleFilterEditor(): ReactNode {
    return isComplexOperator(this.operator) ? null : this.conditionInput;
  }

  get complexFilterEditor(): ReactNode {
    return isComplexOperator(this.operator) ? this.conditionInput : null;
  }

  cannotDetermineConditionInput(propertyType: string): string {
    return `${this.errorContext} Unexpected combination of property type ${propertyType} and condition operator ${this.operator} when trying to determine the condition input field type`;
  }

  get conditionInput(): ReactNode {
    const propertyInfo: MetaPropertyInfo = this.propertyInfoNN;

    switch (propertyInfo.attributeType) {
    // In case of enum generic filter will not be rendered, enum filter will be rendered instead
    case 'ASSOCIATION':
    case 'COMPOSITION':
      switch (this.operator) {
      case '_eq':
      case '_neq':
        return this.selectField;
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      }
    }

    switch (propertyInfo.type as PropertyType) {
    case 'boolean':
      return this.yesNoSelectField;

    case 'dateTime':
    case 'localDateTime':
    case 'offsetDateTime':
      switch (this.operator as TemporalComparisonType) {
      case '_eq':
      case '_neq':
      case '_gt':
      case '_gte':
      case '_lt':
      case '_lte':
        return this.dateTimePickerField;
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      case '__inInterval':
        return this.intervalEditor;
      }
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

    case 'date':
    case 'localDate':
      switch (this.operator as TemporalComparisonType) {
      case '_eq':
      case '_neq':
      case '_gt':
      case '_gte':
      case '_lt':
      case '_lte':
        return this.datePickerField;
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      case '__inInterval':
        return this.intervalEditor;
      }
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

    case 'time':
    case 'localTime':
    case 'offsetTime':
      switch (this.operator as TemporalComparisonType) {
      case '_eq':
      case '_neq':
      case '_gt':
      case '_gte':
      case '_lt':
      case '_lte':
        return this.timePickerField;
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      }
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

    case 'int':
    case 'double':
    case 'decimal':
    case 'long':
      switch (this.operator as NumberComparisonType) {
      case '_eq':
      case '_neq':
      case '_gt':
      case '_gte':
      case '_lt':
      case '_lte':
        return this.numberInputField(propertyInfo.type as NumericPropertyType);
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      }
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

    case 'string':
      switch (this.operator as TextComparisonType) {
      case '_contains':
        // case '_doesNotContain':
      case '_eq':
      case '_neq':
      case '_startsWith':
      case '_endsWith':
        return this.textInputField;
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      }
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

    case 'uuid':
      switch (this.operator as UuidComparisonType) {
      case '_eq':
      case '_neq':
        return this.uuidInputField;
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      }
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

    case 'char':
      switch (this.operator) {
      case '_eq':
      case '_neq':
        return this.charInputField;
      case '_in':
      case '_notIn':
        return this.listEditor;
      case '_isNull':
        return this.yesNoSelectField;
      }
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

    default:
      throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));
    }
  }

  get textInputField(): ReactNode {
    return this.createFilterInput(<Input onChange={this.onTextInputChange}/>, true);
  }

  get charInputField(): ReactNode {
    return this.createFilterInput(<CharInput onChange={this.onTextInputChange}/>, true);
  }

  get uuidInputField(): ReactNode {
    const {entityProperty} = this.props;

    const options = getDefaultFilterFormItemProps(this.props.intl, entityProperty);

    if (!options.rules) 
      options.rules = [];
    

    options.rules.push({
      pattern: uuidPattern,
      message: this.props.intl.formatMessage({id: 'cubaReact.dataTable.validation.uuid'})
    });

    return this.createFilterInput(<UuidInput onChange={this.onTextInputChange}/>, true, options);
  }

  numberInputField(propertyType: NumericPropertyType): ReactNode {
    switch (propertyType) {
    case 'int':
      return this.createFilterInput(<IntegerInput onChange={this.onNumberInputChange}/>, true);
    case 'double':
      return this.createFilterInput(<DoubleInput onChange={this.onNumberInputChange}/>, true);
    case 'long':
      return this.createFilterInput(<LongInput onChange={this.onNumberInputChange}/>, true);
    case 'decimal':
      return this.createFilterInput(<BigDecimalInput onChange={this.onNumberInputChange}/>, true);
    default:
      return assertNever('property type', propertyType);
    }
  }

  get selectField(): ReactNode {
    return this.createFilterInput(
      <Select dropdownMatchSelectWidth={false}
        dropdownClassName={`cuba-value-dropdown-${this.props.entityProperty}`}
        className='cuba-filter-select'
        onSelect={this.onSelectChange}>
        {this.selectFieldOptions}
      </Select>
    );
  }

  get selectFieldOptions(): ReactNodeArray {
    return this.nestedEntityOptions
      .filter(option => option.value != null)
      .map((option) => {
        return (
          <Select.Option title={option.caption}
            value={option.value!} // Nullish values are expected to be filtered out by now
            key={option.value}
            className={`cuba-filter-value-${option.value}`}
          >
            {option.caption}
          </Select.Option>
        );
      })
  }

  get yesNoSelectField(): ReactNode {
    const {entityProperty} = this.props;

    const component = (
      <Select dropdownMatchSelectWidth={false}
        dropdownClassName={`cuba-value-dropdown-${this.props.entityProperty}`}
        className='cuba-filter-select'
        onSelect={this.onYesNoSelectChange}>
        <Select.Option value='true'
          className='cuba-filter-value-true'
        >
          <FormattedMessage id='cubaReact.dataTable.yes'/>
        </Select.Option>
        <Select.Option value='false'
          className='cuba-filter-value-false'
        >
          <FormattedMessage id='cubaReact.dataTable.no'/>
        </Select.Option>
      </Select>
    );

    return this.createFilterInput(component, false, {
      name: `${entityProperty}_yesNoSelect`,
      initialValue: 'true',
      rules: [{required: true}]
    });
  }

  get listEditor(): ReactNode {
    return (
      <Form.Item className='filtercontrol -complex-editor'>
        <DataTableListEditor onChange={(value: string[] | number[]) => this.value = value}
          id={this.props.entityProperty}
          propertyInfo={this.propertyInfoNN}
          nestedEntityOptions={this.nestedEntityOptions}
        />
      </Form.Item>
    );
  }

  get intervalEditor(): ReactNode {
    return (
      <Form.Item className='filtercontrol -complex-editor'>
        <DataTableIntervalEditor onChange={(value: TemporalInterval) => this.value = value}
          id={this.props.entityProperty}
          propertyType={this.propertyInfoNN.type as PropertyType}
        />
      </Form.Item>
    );
  }

  get datePickerField(): ReactNode {
    const component = (
      <DatePicker onChange={this.onTemporalPickerChange}/>
    );
    return this.createFilterInput(component, true);
  }

  get timePickerField(): ReactNode {
    const component = (
      <TimePicker onChange={this.onTemporalPickerChange}/>
    );
    return this.createFilterInput(component, true);
  }

  get dateTimePickerField(): ReactNode {
    const component = (
      <DatePicker showTime={true}
        onChange={this.onTemporalPickerChange}
      />
    );
    return this.createFilterInput(component, true);
  }

  createFilterInput(
    component: ReactNode, hasFeedback = false, formItemProps?: FormItemProps, additionalClassName?: string
  ): ReactNode {
    const {intl, entityProperty} = this.props;

    const name = `${entityProperty}_input`;

    if (formItemProps == null) 
      formItemProps = getDefaultFilterFormItemProps(intl, name);
    else if (formItemProps.name == null) 
      formItemProps.name = name;
    

    return wrapInFormItem(component, hasFeedback, formItemProps, additionalClassName);
  }

}

function determineOperatorGroup(operator: ComparisonType): OperatorGroup {
  switch (operator) {
  case '_eq':
  case '_gt':
  case '_gte':
  case '_lt':
  case '_lte':
  case '_neq':
  case '_startsWith':
  case '_endsWith':
  case '_contains':
    // case 'doesNotContain':
    return OperatorGroup.SINGLE_VALUE;
  case '_in':
  case '_notIn':
    return OperatorGroup.LIST_VALUE;
  case '_isNull':
    return OperatorGroup.LOGICAL_VALUE;
  case '__inInterval':
    return OperatorGroup.INTERVAL_VALUE;
  default:
    throw new Error(`Could not determine condition operator group: unexpected operator ${operator}`);
  }
}

function getAvailableOperators(propertyInfo: MetaPropertyInfo): ComparisonType[] {
  switch (propertyInfo.attributeType) {
  case 'ENUM':
  case 'ASSOCIATION':
  case 'COMPOSITION':
    return ['_eq', '_neq', '_in', '_notIn', '_isNull'];
  }

  switch (propertyInfo.type as PropertyType) {
  case 'boolean':
    return ['_eq', '_neq', '_isNull'];
  case 'date':
  case 'localDate':
  case 'dateTime':
  case 'localDateTime':
  case 'offsetDateTime':
    return ['_eq', '_in', '_notIn', '_neq', '_gt', '_gte', '_lt', '_lte', '_isNull', '__inInterval'];
  case 'time':
  case 'localTime':
  case 'offsetTime':
    return ['_eq', '_in', '_notIn', '_neq', '_gt', '_gte', '_lt', '_lte', '_isNull'];
  case 'int':
  case 'double':
  case 'long':
  case 'decimal':
    return ['_eq', '_in', '_notIn', '_neq', '_gt', '_gte', '_lt', '_lte', '_isNull'];
  case 'string':
    return ['_contains', '_eq', '_in', '_notIn', '_neq', /* TODO 'doesNotContain', */ '_isNull', '_startsWith', '_endsWith'];
  case 'uuid':
  case 'char':
    return ['_eq', '_in', '_notIn', '_neq', '_isNull'];
  default:
    throw new Error(`Could not determine available condition operators for property ${propertyInfo.name} with attribute type ${propertyInfo.attributeType} and type ${propertyInfo.type}`);
  }
}

function isComplexOperator(operator: ComparisonType): boolean {
  const complexOperators: ComparisonType[] = ['_in', '_notIn', '__inInterval'];
  return complexOperators.indexOf(operator) > -1;
}

export function operatorToOptionClassName(operator: ComparisonType): string {
  let className = 'cuba-operator-';
  switch (operator) {
  case '_eq':
    className += 'equals';
    break;
  case '_lt':
    className += 'less';
    break;
  case '_lte':
    className += 'lessOrEqual';
    break;
  case '_gt':
    className += 'greater';
    break;
  case '_gte':
    className += 'greaterOrEqual';
    break;
  case '_neq':
    className += 'notEqual';
    break;
  default:
    className += operator;
  }
  return className;
}

const dataTableCustomFilter = 
  injectIntl(
    injectMainStore(
      injectMetadata(
        observer(
          DataTableCustomFilterComponent
        )
      )
    )
  );

export {dataTableCustomFilter as DataTableCustomFilter};

import React, {ReactNode, ReactNodeArray} from 'react';
import { Form } from 'antd';
import { Button, DatePicker, Divider, Input, message, Select, Spin, TimePicker } from 'antd';
import {FilterDropdownProps} from 'antd/es/table/interface';
import {observer} from 'mobx-react';
import {NumericPropertyType, OperatorType, PropertyType, getStringId} from '@haulmont/jmix-rest';
import { action, computed, observable, makeObservable } from 'mobx';
import {Moment} from 'moment';
import {DataTableListEditor} from './DataTableListEditor';
import {DataTableIntervalEditor, TemporalInterval} from './DataTableIntervalEditor';
import './DataTableCustomFilter.less';
import './DataTableFilterControlLayout.less';
import {injectIntl, WrappedComponentProps, FormattedMessage} from 'react-intl';
import {
  MainStoreInjected,
  injectMainStore,
  WithId,
  getJmixREST,
  getPropertyInfo,
  assertNever,
  applyDataTransferFormat,
  stripMilliseconds,
  injectMetadata,
  MetadataInjected,
  MetaClassInfo,
  MetaPropertyInfo,
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
}

export type ComparisonType = OperatorType | 'inInterval';

enum OperatorGroup {
  SINGLE_VALUE = 'singleValue',
  LIST_VALUE = 'listValue',
  LOGICAL_VALUE = 'logicalValue',
  INTERVAL_VALUE = 'intervalValue',
}
class DataTableCustomFilterComponent<E extends WithId> extends React.Component<DataTableCustomFilterProps & WrappedComponentProps> {

  nestedEntityOptions: CaptionValuePair[] = [];
  loading = true;

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
      nestedEntityOptions: observable,
      loading: observable,
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

  componentDidMount(): void {
    const propertyInfo: MetaPropertyInfo = this.propertyInfoNN;
    const metaClassInfo: MetaClassInfo | undefined = this.props.metadata.entities.find((classInfo: MetaClassInfo) => {
      return classInfo.entityName === propertyInfo.type;
    });

    if (metaClassInfo) {
      // This is a nested entity column. Fetch select options.
      getJmixREST()!.loadEntities<E>(metaClassInfo.entityName, {view: '_minimal'})
        .then(
          (resp) => {
            resp.forEach((instance) => {
              this.nestedEntityOptions.push({
                caption: instance._instanceName || '',
                value: getStringId(instance.id!)
              });
            });
            this.loading = false;
          }
        )
        .catch(
          () => {
            message.error(this.props.intl.formatMessage({id: 'cubaReact.dataTable.failedToLoadNestedEntities'}));
            this.loading = false;
          }
        );
    } else {
      this.loading = false;
    }
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

    if (!propertyInfo) {
      throw new Error(`${this.errorContext} Cannot find MetaPropertyInfo`);
    }

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
    if ((customFilterRef != null) && (formInstance != null)) {
      customFilterRef(formInstance);
    }
    this.formInstance = formInstance;
  };

  resetFormFields = (newOperator: ComparisonType) => {
    if (this.formInstance != null) {
      const fieldsToReset: string[] = [];
      if (!isComplexOperator(newOperator)) {
        fieldsToReset.push(`${this.props.entityProperty}_input`);
      } else if (newOperator === 'inInterval') {
        fieldsToReset.push(
          `${this.props.entityProperty}_predefined`,
          `${this.props.entityProperty}_number`,
        );
      }
      if (fieldsToReset.length > 0) {
        this.formInstance.resetFields(fieldsToReset);
      }
    }
  };

  initValue = (operator: ComparisonType = this.operator): void => {
    if (operator === 'notEmpty' || this.propertyInfoNN.type === 'boolean') {
      this.value = true;
    } else if (operator === 'in' || operator === 'notIn') {
      this.value = [];
    } else {
      this.value = undefined;
    }
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

  onTemporalPickerChange = (value: Moment | null) => {
    if (value != null) {
      this.value = applyDataTransferFormat(stripMilliseconds(value), this.propertyInfoNN.type as PropertyType);
    }
  }

  onYesNoSelectChange = (value: string | number | LabeledValue): void => {
    this.value = (value === 'true');
  };

  onSelectChange = (value: string | number | LabeledValue): void => {
    this.value = value as string;
  };

  render() {
    if (this.loading) {
      return (
        <Spin
          tip={this.props.intl.formatMessage({id: 'cubaReact.dataTable.loading'})}
          className='cuba-table-filter-loader'
        />
      );
    }

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
        return '=';
    }

    switch (propertyInfo.type as PropertyType) {
      case 'boolean':
        return '=';
      case 'date':
      case 'time':
      case 'dateTime':
      case 'localDate':
      case 'localTime':
      case 'localDateTime':
      case 'offsetDateTime':
      case 'offsetTime':
        return '=';
      case 'int':
      case 'double':
      case 'decimal':
      case 'long':
      case 'char':
        return '=';
      case 'string':
        return 'contains';
      case 'uuid':
        return '=';
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
      case '=':
      case '>':
      case '>=':
      case '<':
      case '<=':
      case '<>':
        return operator;
      case 'startsWith':
      case 'endsWith':
      case 'contains':
      case 'doesNotContain':
      case 'in':
      case 'notIn':
      case 'notEmpty':
      case 'inInterval':
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
          case '=':
          case '<>':
            return this.selectField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
    }

    switch (propertyInfo.type as PropertyType) {
      case 'boolean':
        return this.yesNoSelectField;

      case 'dateTime':
      case 'localDateTime':
      case 'offsetDateTime':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.dateTimePickerField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
          case 'inInterval':
            return this.intervalEditor;
        }
        throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

      case 'date':
      case 'localDate':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.datePickerField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
          case 'inInterval':
            return this.intervalEditor;
        }
        throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

      case 'time':
      case 'localTime':
      case 'offsetTime':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.timePickerField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
        throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

      case 'int':
      case 'double':
      case 'decimal':
      case 'long':
        switch (this.operator) {
          case '=':
          case '<>':
          case '>':
          case '>=':
          case '<':
          case '<=':
            return this.numberInputField(propertyInfo.type as NumericPropertyType);
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
        throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

      case 'string':
        switch (this.operator) {
          case 'contains':
          case 'doesNotContain':
          case '=':
          case '<>':
          case 'startsWith':
          case 'endsWith':
            return this.textInputField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }
        throw new Error(this.cannotDetermineConditionInput(propertyInfo.type));

      case 'uuid':
        switch (this.operator) {
          case '=':
          case '<>':
            return this.uuidInputField;
          case 'in':
          case 'notIn':
            return this.listEditor;
          case 'notEmpty':
            return this.yesNoSelectField;
        }

        case 'char':
          switch (this.operator) {
            case '=':
            case '<>':
              return this.charInputField;
            case 'in':
            case 'notIn':
              return this.listEditor;
            case 'notEmpty':
              return this.yesNoSelectField;
          }

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

    if (!options.rules) {
      options.rules = [];
    }

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
  };

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
    component: ReactNode, hasFeedback: boolean = false, formItemProps?: FormItemProps, additionalClassName?: string
  ): ReactNode {
    const {intl, entityProperty} = this.props;

    const name = `${entityProperty}_input`;

    if (formItemProps == null) {
      formItemProps = getDefaultFilterFormItemProps(intl, name);
    } else if (formItemProps.name == null) {
      formItemProps.name = name;
    }

    return wrapInFormItem(component, hasFeedback, formItemProps, additionalClassName);
  }

}

function determineOperatorGroup(operator: ComparisonType): OperatorGroup {
  switch (operator) {
    case '=':
    case '>':
    case '>=':
    case '<':
    case '<=':
    case '<>':
    case 'startsWith':
    case 'endsWith':
    case 'contains':
    case 'doesNotContain':
      return OperatorGroup.SINGLE_VALUE;
    case 'in':
    case 'notIn':
      return OperatorGroup.LIST_VALUE;
    case 'notEmpty':
      return OperatorGroup.LOGICAL_VALUE;
    case 'inInterval':
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
      return ['=', '<>', 'in', 'notIn', 'notEmpty'];
  }

  switch (propertyInfo.type as PropertyType) {
    case 'boolean':
      return ['=', '<>', 'notEmpty'];
    case 'date':
    case 'localDate':
    case 'dateTime':
    case 'localDateTime':
    case 'offsetDateTime':
      return ['=', 'in', 'notIn', '<>', '>', '>=', '<', '<=', 'notEmpty', 'inInterval'];
    case 'time':
      return ['=', 'in', 'notIn', '<>', '>', '>=', '<', '<=', 'notEmpty'];
    case 'localTime':
    case 'offsetTime':
      // 'in', 'notIn' are not supported, see https://github.com/cuba-platform/restapi/issues/93
      return ['=', '<>', '>', '>=', '<', '<=', 'notEmpty'];
    case 'int':
    case 'double':
    case 'long':
    case 'decimal':
      return ['=', 'in', 'notIn', '<>', '>', '>=', '<', '<=', 'notEmpty'];
    case 'string':
      return ['contains', '=', 'in', 'notIn', '<>', 'doesNotContain', 'notEmpty', 'startsWith', 'endsWith'];
    case 'uuid':
    case 'char':
      return ['=', 'in', 'notIn', '<>', 'notEmpty'];
    default:
      throw new Error(`Could not determine available condition operators for property ${propertyInfo.name} with attribute type ${propertyInfo.attributeType} and type ${propertyInfo.type}`);
  }
}

function isComplexOperator(operator: ComparisonType): boolean {
  const complexOperators: string[] = ['in', 'notIn', 'inInterval'];
  return complexOperators.indexOf(operator) > -1;
}

export function operatorToOptionClassName(operator: ComparisonType): string {
  let className = 'cuba-operator-';
  switch (operator) {
    case '=':
      className += 'equals';
      break;
    case '<':
      className += 'less';
      break;
    case '<=':
      className += 'lessOrEqual';
      break;
    case '>':
      className += 'greater';
      break;
    case '>=':
      className += 'greaterOrEqual';
      break;
    case '<>':
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

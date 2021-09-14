import {observer} from 'mobx-react';
import React, {ReactNode} from 'react';
import { action, computed, observable, makeObservable } from 'mobx';
import { Form } from 'antd';
import { Checkbox, InputNumber, Radio, Select } from 'antd';
import {RadioChangeEvent} from 'antd/es/radio';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {determineLastNextXInterval, determinePredefinedInterval} from './DataTableIntervalFunctions';
import intervalStyles from './DataTableIntervalEditor.module.less';
import filterStyles from './DataTableFilter.module.less';
import {FormattedMessage, injectIntl, WrappedComponentProps} from 'react-intl';
import { PropertyType, TemporalPropertyType } from '@haulmont/jmix-react-core';
import classNames from 'classnames';

export interface TemporalInterval {
  minDate: string,
  maxDate: string,
}

interface DataTableIntervalEditorProps {
  onChange: (value: TemporalInterval) => void,
  id: string,
  propertyType: PropertyType
}

export type DataTableIntervalEditorMode = 'last' | 'next' | 'predefined';
export type TimeUnit = 'days' | 'hours' | 'minutes' | 'months';
export type PredefinedIntervalOption = 'today' | 'yesterday' | 'tomorrow' | 'lastMonth' | 'thisMonth' | 'nextMonth';

class DataTableIntervalEditorComponent extends React.Component<DataTableIntervalEditorProps & WrappedComponentProps> {
  mode: DataTableIntervalEditorMode = 'last';
  option: PredefinedIntervalOption = 'today';
  numberOfUnits: number = 5;
  timeUnit: TimeUnit = 'days';
  includeCurrent: boolean = false;

  constructor(props: DataTableIntervalEditorProps & WrappedComponentProps) {
    super(props);

    makeObservable(this, {
      mode: observable,
      option: observable,
      numberOfUnits: observable,
      timeUnit: observable,
      includeCurrent: observable,
      interval: computed,
      onModeChanged: action,
      onPredefinedIntervalOptionChanged: action,
      onIntervalNumberChanged: action,
      onIntervalUnitChanged: action,
      onIncludeCurrentChanged: action,
      modeSelect: computed,
      predefinedIntervals: computed,
      intervalInput: computed
    });
  }

  componentDidMount(): void {
    this.props.onChange(this.interval);
  }

  get interval(): TemporalInterval {
    return (this.mode === 'predefined')
      ? determinePredefinedInterval(this.option, this.props.propertyType as TemporalPropertyType)
      : determineLastNextXInterval(this.mode, this.numberOfUnits, this.timeUnit, this.includeCurrent, this.props.propertyType as TemporalPropertyType);
  }

  onModeChanged = (e: RadioChangeEvent) => {
    this.mode = e.target.value;
    this.props.onChange(this.interval);
  };

  onPredefinedIntervalOptionChanged = (option: PredefinedIntervalOption) => {
    this.option = option;
    this.props.onChange(this.interval);
  };

  onIntervalNumberChanged = (value: string | number | null | undefined) => {
    if (value != null && typeof value === 'number' && isFinite(value)) {
      this.numberOfUnits = value;
      this.props.onChange(this.interval);
    }
  };

  onIntervalUnitChanged = (unit: TimeUnit) => {
    this.timeUnit = unit;
    this.props.onChange(this.interval);
  };

  onIncludeCurrentChanged = (includeCurrent: CheckboxChangeEvent) => {
    this.includeCurrent = includeCurrent.target.checked;
    this.props.onChange(this.interval);
  };

  render() {
    return (
      <div className={classNames(
        filterStyles.controlsLayout,
        filterStyles.filterInterval)
      }>
        {this.modeSelect}
        {(this.mode === 'predefined') ? this.predefinedIntervals : this.intervalInput}
      </div>
    );
  }

  get modeSelect(): ReactNode {
    return (
      <Radio.Group
          className={intervalStyles.intervalModeSelect}
          onChange={this.onModeChanged}
          value={this.mode}>
        <Radio value={'last'}>
          <FormattedMessage id='jmix.dataTable.intervalEditor.last'/>
        </Radio>
        <Radio value={'next'}>
          <FormattedMessage id='jmix.dataTable.intervalEditor.next'/>
        </Radio>
        <Radio value={'predefined'}>
          <FormattedMessage id='jmix.dataTable.intervalEditor.predefined'/>
        </Radio>
      </Radio.Group>
    );
  }

  get predefinedIntervals(): ReactNode {
    return (
      <Form.Item className={filterStyles.filterControl}
                 name={`${this.props.id}_predefined`}
                 initialValue={this.option}
                 rules={[{
                   required: true,
                   message: this.props.intl.formatMessage({id: 'jmix.dataTable.validation.requiredField'})
                 }]}
      >
        <Select onChange={this.onPredefinedIntervalOptionChanged}
                dropdownMatchSelectWidth={false}
                className={intervalStyles.intervalPredefinedSelect}
        >
          <Select.Option value={'today'}>
            <FormattedMessage id='jmix.dataTable.intervalEditor.today' />
          </Select.Option>
          <Select.Option value={'yesterday'}>
            <FormattedMessage id='jmix.dataTable.intervalEditor.yesterday' />
          </Select.Option>
          <Select.Option value={'tomorrow'}>
            <FormattedMessage id='jmix.dataTable.intervalEditor.tomorrow' />
          </Select.Option>
          <Select.Option value={'lastMonth'}>
            <FormattedMessage id='jmix.dataTable.intervalEditor.lastMonth' />
          </Select.Option>
          <Select.Option value={'thisMonth'}>
            <FormattedMessage id='jmix.dataTable.intervalEditor.thisMonth' />
          </Select.Option>
          <Select.Option value={'nextMonth'}>
            <FormattedMessage id='jmix.dataTable.intervalEditor.nextMonth' />
          </Select.Option>
        </Select>
      </Form.Item>
    );
  }

  get intervalInput(): ReactNode {
    return (
      <div className={filterStyles.controlsLayout}>
        <Form.Item key={`${this.props.id}.wrap.number`}
                   className={filterStyles.filterControl}
                   name={`${this.props.id}_number`}
                   initialValue={this.numberOfUnits}
                   rules={[{
                     required: true,
                     message: this.props.intl.formatMessage({id: 'jmix.dataTable.validation.requiredField'})
                   }]}
        >
          <InputNumber onChange={this.onIntervalNumberChanged}/>
        </Form.Item>
        <Form.Item key={`${this.props.id}.wrap.unit`} className={filterStyles.filterControl}>
          <Select defaultValue={this.timeUnit}
                  onChange={this.onIntervalUnitChanged}
                  dropdownMatchSelectWidth={false}>
            <Select.Option value={'days'}>
              <FormattedMessage id='jmix.dataTable.intervalEditor.days' />
            </Select.Option>
            <Select.Option value={'hours'}>
              <FormattedMessage id='jmix.dataTable.intervalEditor.hours' />
            </Select.Option>
            <Select.Option value={'minutes'}>
              <FormattedMessage id='jmix.dataTable.intervalEditor.minutes' />
            </Select.Option>
            <Select.Option value={'months'}>
              <FormattedMessage id='jmix.dataTable.intervalEditor.months' />
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item key={`${this.props.id}.wrap.includeCurrent`} className={filterStyles.filterControl}>
          <Checkbox onChange={this.onIncludeCurrentChanged}
                    className={intervalStyles.intervalIncludeCurrent}
                    defaultChecked={this.includeCurrent}>
            <FormattedMessage id='jmix.dataTable.intervalEditor.includingCurrent' />
          </Checkbox>
        </Form.Item>
      </div>
    );
  }

}

const dataTableIntervalEditor =
    injectIntl(
      observer(
        DataTableIntervalEditorComponent
      )
    );

export { dataTableIntervalEditor as DataTableIntervalEditor };

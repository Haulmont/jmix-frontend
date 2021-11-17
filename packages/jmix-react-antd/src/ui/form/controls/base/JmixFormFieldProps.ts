import {FormItemProps} from "antd";

export interface JmixFormFieldProps<
  ValueType = any, OnChangeType = (value: any) => void
  > {
  value?: ValueType;
  onChange?: OnChangeType;
  entityName?: string;
  propertyName: string;
  formItemProps?: FormItemProps;
  disabled?: boolean;
}
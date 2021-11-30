import { Select } from "antd";
import { SelectProps, SelectValue } from "antd/es/select";
import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";

export function SelectField({
  entityName,
  propertyName,
  formItemProps,
  value,
  onChange,
  ...rest
}: JmixFormFieldProps & SelectProps<SelectValue>) {
  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <Select
          mode="multiple"
          value={value}
          onChange={onChange}
          disabled={isReadOnly}
          showSearch
          filterOption
          optionFilterProp="label"
          {...rest}
        />
      )}
    />
  );
}

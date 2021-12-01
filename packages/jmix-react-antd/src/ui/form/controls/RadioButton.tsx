import { Radio } from "antd";
import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";
import { RadioGroupProps } from "antd/es";

export function RadioButton({
  entityName,
  propertyName,
  formItemProps,
  value,
  onChange,
  ...rest
}: JmixFormFieldProps & RadioGroupProps) {
  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <Radio.Group
          value={value}
          onChange={onChange}
          disabled={isReadOnly}
          {...rest}
        />
      )}
    />
  );
}

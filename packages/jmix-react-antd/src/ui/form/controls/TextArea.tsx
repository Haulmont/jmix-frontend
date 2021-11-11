import { Input } from "antd";
import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { TextAreaProps } from "antd/es/input";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";

export function TextArea({
  entityName,
  propertyName,
  formItemProps,
  value,
  onChange,
  ...rest
}: JmixFormFieldProps & TextAreaProps) {
  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <Input.TextArea
          rows={4}
          value={value}
          onChange={onChange}
          disabled={isReadOnly}
          {...rest}
        />
      )}
    />
  );
}

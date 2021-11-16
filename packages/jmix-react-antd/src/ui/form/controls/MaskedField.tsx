import { Input } from "antd";
import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { InputProps } from "antd/es/input";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";
import ReactInputMask, { Props as ReactInputMaskProps } from "react-input-mask";

export type InputWithMaskProps = Omit<ReactInputMaskProps, "size" | "prefix"> &
  InputProps;

export function MaskedField({
  entityName,
  propertyName,
  formItemProps,
  value,
  onChange,
  size,
  prefix,
  ...rest
}: JmixFormFieldProps & InputProps & InputWithMaskProps) {
  const passedValue = value ? value : "";

  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <ReactInputMask
          value={passedValue}
          onChange={onChange}
          disabled={isReadOnly}
          {...rest}
        >
          {(inputProps: InputProps) => {
            return <Input prefix={prefix} size={size} {...inputProps} />;
          }}
        </ReactInputMask>
      )}
    />
  );
}

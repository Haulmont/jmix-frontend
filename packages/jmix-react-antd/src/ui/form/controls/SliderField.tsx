import { Slider } from "antd";
import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { SliderSingleProps, SliderRangeProps } from "antd/es/slider";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";

export type SliderFieldProps = (SliderSingleProps | SliderRangeProps) &
  JmixFormFieldProps;

export function SliderField({
  entityName,
  propertyName,
  formItemProps,
  value,
  onChange,
  ...rest
}: SliderFieldProps) {
  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <Slider
          value={value}
          onChange={onChange}
          disabled={isReadOnly}
          {...rest}
        />
      )}
    />
  );
}

import * as React from "react";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";
import { DatePicker, DatePickerProps } from '../../DatePicker';

export function DateField({
  entityName, propertyName, formItemProps, value, onChange, ...rest
}: JmixFormFieldProps & DatePickerProps) {
  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={formItemProps}
                          renderField={(isReadOnly) => (
                            <DatePicker value={value}
                                        onChange={onChange}
                                        disabled={isReadOnly}
                                        {...rest}
                            />
                          )}
    />
  );
}
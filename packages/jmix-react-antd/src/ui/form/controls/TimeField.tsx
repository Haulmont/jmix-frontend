import * as React from "react";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";
import { TimePicker, TimePickerProps } from '../../TimePicker';

export function TimeField({
  entityName, propertyName, formItemProps, value, onChange, ...rest
} : JmixFormFieldProps & TimePickerProps) {
  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={formItemProps}
                          renderField={(isReadOnly) => (
                            <TimePicker value={value}
                                        onChange={onChange}
                                        disabled={isReadOnly}
                                        {...rest}
                            />
                          )}
    />
  );
}
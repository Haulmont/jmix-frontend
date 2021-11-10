import {TimePicker, TimePickerProps} from "antd";
import * as React from "react";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";

export function TimeField({entityName, propertyName, formItemProps, ...rest} : JmixFormFieldProps & TimePickerProps) {
  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={formItemProps}
                          renderField={(isReadOnly) => (
                            <TimePicker disabled={isReadOnly} {...rest}/>
                          )}
    />
  );
}
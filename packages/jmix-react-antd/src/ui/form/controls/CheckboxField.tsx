import {Checkbox, CheckboxProps} from "antd";
import * as React from "react";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";

export function CheckboxField({
  entityName, propertyName, formItemProps, value, onChange, ...rest
}: JmixFormFieldProps & CheckboxProps) {
  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={{valuePropName: "checked", ...formItemProps}}
                          renderField={(isReadOnly) => (
                            <Checkbox value={value}
                                      onChange={onChange}
                                      disabled={isReadOnly}
                                      {...rest}
                            />
                          )}
    />
  );
}
import { Input } from "antd";
import * as React from "react";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {InputProps} from "antd/es/input";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";

export function TextField({
  entityName, propertyName, formItemProps, value, onChange, ...rest
}: JmixFormFieldProps & InputProps) {
  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={formItemProps}
                          renderField={(isReadOnly) => (
                            <Input value={value}
                                   onChange={onChange}
                                   disabled={isReadOnly}
                                   {...rest}
                            />
                          )}
    />
  );
}
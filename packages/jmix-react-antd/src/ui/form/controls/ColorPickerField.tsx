import * as React from "react";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {ColorPicker, ColorPickerProps} from './ColorPicker';

export const ColorPickerField = ({
  entityName, propertyName, formItemProps, value, onChange, ...rest
}: JmixFormFieldProps & ColorPickerProps) => {
  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={formItemProps}
                          renderField={(isReadOnly => (
                            <ColorPicker value={value}
                                         onChange={onChange}
                                         disabled={isReadOnly}
                                         id={propertyName}
                                         {...rest}
                            />
                          ))}
    />
  );
};

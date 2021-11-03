import * as React from "react";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {ColorPicker} from './ColorPicker';

export const ColorPickerField = ({
  entityName, propertyName, formItemProps, value, onChange
}: JmixFormFieldProps) => {
  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={formItemProps}
                          renderField={(isReadOnly => (
                            <ColorPicker value={value}
                                         onChange={onChange}
                                         disabled={isReadOnly}
                                         id={propertyName}
                            />
                          ))}
    />
  );
};

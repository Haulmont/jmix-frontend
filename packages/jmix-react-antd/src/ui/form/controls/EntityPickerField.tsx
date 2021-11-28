import * as React from "react";
import {JmixFormFieldWrapper} from "./base/JmixFormFieldWrapper";
import {JmixFormFieldProps} from "./base/JmixFormFieldProps";
import { EntityPicker, EntityPickerProps } from './EntityPicker';

export function EntityPickerField({
  entityName,
  propertyName, 
  formItemProps, 
  value, 
  onChange, 
  ...rest
} : JmixFormFieldProps & EntityPickerProps) {
  return (
    <JmixFormFieldWrapper 
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={(isReadOnly) => (
        <EntityPicker 
          entityName={entityName}
          propertyName={propertyName}
          value={value}
          onChange={onChange}
          disabled={isReadOnly}
          {...rest}
        />
      )}
    />
  );
}

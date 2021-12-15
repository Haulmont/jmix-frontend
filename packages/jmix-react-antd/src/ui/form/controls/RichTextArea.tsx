import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";
import {RichTextField} from "./RichTextField";
import {ReactQuillProps} from "react-quill";

export function RichTextArea({
  entityName,
  propertyName,
  formItemProps,
  ...rest
}: JmixFormFieldProps & ReactQuillProps) {
  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <RichTextField isReadOnly={isReadOnly} {...rest} />
      )}
    />
  );
}

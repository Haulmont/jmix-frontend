import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";
import { RichTextField } from "./RichTextField";
import { EditorProps } from "react-draft-wysiwyg";

export const RichTextArea = ({
  entityName,
  propertyName,
  formItemProps,
  ...rest
}: JmixFormFieldProps & EditorProps) => {
  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <RichTextField
          isReadOnly={isReadOnly}
          {...rest}
        />
      )}
    />
  );
};

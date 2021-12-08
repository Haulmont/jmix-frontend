import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './RichTextArea.less'

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
        <ReactQuill readOnly={isReadOnly} theme="snow" {...rest} />
      )}
    />
  );
}

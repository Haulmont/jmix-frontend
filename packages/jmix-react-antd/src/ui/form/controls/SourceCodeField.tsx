import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";
import styles from "./SourceCodeField.module.less";
import classNames from "classnames";
import "ace-builds/src-noconflict/theme-github";
import AceEditor, { IAceEditorProps } from "react-ace";

export function SourceCodeField({
  entityName,
  propertyName,
  formItemProps,
  value,
  onChange,
  ...rest
}: JmixFormFieldProps & IAceEditorProps) {
  return (
    <JmixFormFieldWrapper
      entityName={entityName}
      propertyName={propertyName}
      formItemProps={formItemProps}
      renderField={isReadOnly => (
        <AceEditor
          value={value}
          onChange={onChange}
          readOnly={isReadOnly}
          width="100%"
          className={classNames(styles.sourceCodeField)}
          showPrintMargin={false}
          theme="github"
          name={propertyName}
          editorProps={{ $blockScrolling: true }}
          setOptions={{ useWorker: false }}
          {...rest}
        />
      )}
    />
  );
}

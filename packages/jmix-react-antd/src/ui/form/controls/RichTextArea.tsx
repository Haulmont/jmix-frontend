import * as React from "react";
import { JmixFormFieldWrapper } from "./base/JmixFormFieldWrapper";
import { JmixFormFieldProps } from "./base/JmixFormFieldProps";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import styles from "./RichTextArea.module.less";
import classNames from "classnames";
import { getMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const RichTextArea = observer(
  ({
    entityName,
    propertyName,
    formItemProps,
    ...rest
  }: JmixFormFieldProps & EditorProps) => {
    const mainStore = getMainStore();

    if (!mainStore || !mainStore.locale) {
      return null;
    }

    return (
      <JmixFormFieldWrapper
        entityName={entityName}
        propertyName={propertyName}
        formItemProps={formItemProps}
        renderField={isReadOnly => (
          <Editor
            readOnly={isReadOnly}
            wrapperClassName={classNames(styles.richTextAreaWrapper)}
            editorClassName={classNames(styles.richTextAreaEditor)}
            localization={{
              locale: mainStore.locale
            }}
            {...rest}
          />
        )}
      />
    );
  }
);

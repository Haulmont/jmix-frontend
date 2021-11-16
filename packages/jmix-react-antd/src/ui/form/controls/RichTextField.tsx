import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import styles from "./RichTextArea.module.less";
import classNames from "classnames";
import { getMainStore } from "@haulmont/jmix-react-core";
import { observer } from "mobx-react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {ContentState, EditorState, RawDraftContentState} from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

export interface RichTextFieldProps {
  isReadOnly: boolean;
  onChange?: Function;
  value?: string;
}

function stringToEditorState(input: string): EditorState {
  const { contentBlocks, entityMap } = htmlToDraft(input);
  return EditorState.createWithContent(
    ContentState.createFromBlockArray(contentBlocks, entityMap)
  );
}

function rawStateToString(state: RawDraftContentState): string {
  return draftToHtml(state);
}

export const RichTextField = observer(
  ({
    isReadOnly,
    onChange,
    value,
    ...rest
  }: RichTextFieldProps) => {
    const mainStore = getMainStore();

    const handleChange = React.useCallback(
      (state: RawDraftContentState) => {
        if (onChange) onChange(rawStateToString(state));
      },
      [onChange]
    );

    return (
      <Editor
        readOnly={isReadOnly}
        wrapperClassName={classNames(styles.richTextAreaWrapper)}
        editorClassName={classNames(styles.richTextAreaEditor)}
        localization={{
          locale: mainStore.locale
        }}
        defaultEditorState={value ? stringToEditorState(value) : undefined}
        onChange={handleChange}
        {...rest}
      />
    );
  }
);

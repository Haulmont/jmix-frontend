import * as React from "react";
import ReactQuill from 'react-quill';
import RichTextAreaToolbar, {modules, formats} from "./RichTextAreaToolbar";
import "react-quill/dist/quill.snow.css";
import './RichTextArea.less';

export interface RichTextFieldProps {
  isReadOnly: boolean;
  onChange?: Function;
  value?: string;
}

export function RichTextField({value, onChange, isReadOnly, ...rest}: RichTextFieldProps) {

  const handleChange = React.useCallback(
    (state: string) => {
      if (onChange) onChange(state);
    },
    [onChange]
  );

  return (
    <div>
      <RichTextAreaToolbar/>
      <ReactQuill readOnly={isReadOnly} value={value} onChange={handleChange} theme="snow" modules={modules} formats={formats} {...rest} />
    </div>
  );
}

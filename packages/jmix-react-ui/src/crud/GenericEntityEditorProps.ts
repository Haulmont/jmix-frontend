import { MayHaveId } from "@haulmont/jmix-react-core";

export interface GenericEntityEditorProps {
  onCommit?: (value: this['entityInstance']) => void;
  entityInstance?: MayHaveId;
  submitBtnCaption?: string;
}
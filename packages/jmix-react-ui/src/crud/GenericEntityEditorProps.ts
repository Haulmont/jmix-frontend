import { MayHaveId } from "@haulmont/jmix-react-core";

export interface GenericEntityEditorProps {
  onCommit?: (value: MayHaveId) => void;
  entityInstance?: MayHaveId;
  submitBtnCaption?: string;
}
import { MayHaveId } from "@haulmont/jmix-react-core";

export interface EntityEditorProps {
  onCommit?: (value: MayHaveId) => void;
  entityInstance?: MayHaveId;
  submitBtnCaption?: string;
}
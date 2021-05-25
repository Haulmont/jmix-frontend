import {EntityInstance} from "@haulmont/jmix-react-core";

export interface EntityEditorProps<TEntity = unknown> {
  onCommit?: (value: this['entityInstance']) => void;
  entityInstance?: EntityInstance<TEntity>;
  submitBtnCaption?: string;
  hiddenAttributes?: string[];
}
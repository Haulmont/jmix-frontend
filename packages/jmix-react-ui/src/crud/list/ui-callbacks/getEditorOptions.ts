import { EntityInstance } from "@haulmont/jmix-react-core";

export function getEditorOptions<TEntity>(
  entityList?: Array<EntityInstance<TEntity>>,
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void,
  reverseAttrName?: string
): {
  submitBtnCaption?: string,
  hiddenAttributes?: string[]
} {
  let submitBtnCaption: string | undefined;

  const hiddenAttributes = reverseAttrName != null
    ? [reverseAttrName]
    : undefined;

  if (entityList != null && onEntityListChange != null) {
    submitBtnCaption = 'common.ok';
  }

  return {submitBtnCaption, hiddenAttributes};
}

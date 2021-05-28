import { EntityInstance } from "@haulmont/jmix-react-core";

export function getSubmitBtnCaption<TEntity = unknown>(
  entityList?: Array<EntityInstance<TEntity>>,
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void,
): string | undefined {
  let submitBtnCaption: string | undefined;

  if (entityList != null && onEntityListChange != null) {
    submitBtnCaption = 'common.ok';
  }

  return submitBtnCaption;
}

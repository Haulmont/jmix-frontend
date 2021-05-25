import {useIntl} from "react-intl";
import {useCallback} from "react";
import {openEntityEditorScreen} from "../../../util/screen";
import {EntityInstance, Screens, generateTempId} from "@haulmont/jmix-react-core";
import { getEditorOptions } from "./getEditorOptions";

export function useCreateBtnCallback<TEntity>(
  screens: Screens,
  entityName: string,
  entityList?: Array<EntityInstance<TEntity>>,
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void,
  reverseAttrName?: string
) {
  const {submitBtnCaption, hiddenAttributes} = getEditorOptions(entityList, onEntityListChange, reverseAttrName);
  const intl = useIntl();

  let onCommit: ((entityInstance?: EntityInstance<TEntity>) => void) | undefined = undefined; // We need to initialize it so that it can be used in useCallback deps array

  if (entityList != null && onEntityListChange != null) {
    onCommit = (entityInstance?: EntityInstance<TEntity>) => {
      if (entityInstance != null) {
        const newEntityInstance = {
          ...entityInstance,
          id: generateTempId(),
          '_instanceName': intl.formatMessage({id: 'common.unsavedEntity'})
        };
        onEntityListChange([
          newEntityInstance,
          ...entityList
        ]);
      }
    };
  }

  return useCallback(() => {
    openEntityEditorScreen({
      screens,
      entityName,
      onCommit,
      submitBtnCaption,
      hiddenAttributes
    });
  }, [screens, entityName, onCommit, submitBtnCaption, hiddenAttributes]);
}

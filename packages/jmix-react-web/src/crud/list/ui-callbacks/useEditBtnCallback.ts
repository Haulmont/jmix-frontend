import {useIntl} from "react-intl";
import {useCallback} from "react";
import {openEntityEditorScreen} from "../../../util/screen";
import {EntityInstance, Screens} from "@haulmont/jmix-react-core";
import { getSubmitBtnCaption } from "../util/getSubmitBtnCaption";
import * as React from "react";

export function useEditBtnCallback<TEntity>(
  screens: Screens,
  entityName: string,
  routingPath: string,
  selectedEntityId?: string,
  entityList?: Array<EntityInstance<TEntity>>,
  onEntityListChange?: (entityList: Array<EntityInstance<TEntity>>) => void,
  onOpenScreenError?: (entityName: string) => void
) {
  const submitBtnCaption = getSubmitBtnCaption(entityList, onEntityListChange);
  const intl = useIntl();

  let onCommit: ((entityInstance?: EntityInstance<TEntity>) => void) | undefined = undefined;

  if (entityList != null && onEntityListChange != null) {
    onCommit = (updatedEntity?: EntityInstance<TEntity>) => {
      if (updatedEntity != null) {
        const updatedEntityRenamed = {
          ...updatedEntity,
          // Changes made to the entity might have invalidated the instance name
          '_instanceName': intl.formatMessage({id: 'common.unsavedEntity'})
        };
        const newList = entityList.map(originalEntity => {
          if (originalEntity.id === updatedEntityRenamed.id) {
            return updatedEntityRenamed;
          }
          return originalEntity;
        });
        onEntityListChange(newList);
      }
    };
  }

  return useCallback((_event?: React.MouseEvent, entityId: string | undefined = selectedEntityId) => {
    const entityInstance = entityList != null
      ? entityList.find(e => e.id === entityId)
      : undefined;
    openEntityEditorScreen({
      screens, 
      entityName, 
      entityIdToLoad: entityId, 
      routingPath, 
      entityInstance, 
      onCommit, 
      submitBtnCaption, 
      onOpenScreenError
    });
  }, [entityList, selectedEntityId, screens, entityName, routingPath, onCommit, submitBtnCaption]);
}

import { useIntl } from "react-intl";
import { EntityInstance } from '@haulmont/jmix-react-core';
import { showDeleteEntityDialog } from "../../common/showDeleteEntityDialog"
import { useCallback } from "react";

export function useEntityDeleteCallback(): (onConfirm: () => void, entityInstance?: EntityInstance) => void {
  const intl = useIntl();

  const onEntityDelete = useCallback((onConfirm: () => void, entityInstance?: EntityInstance) => {
    showDeleteEntityDialog(onConfirm, intl, entityInstance);
  }, [showDeleteEntityDialog, intl]);
  return onEntityDelete
}

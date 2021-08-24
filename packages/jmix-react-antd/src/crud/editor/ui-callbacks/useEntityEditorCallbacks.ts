import {NotificationType, notifications} from "../../../ui/notifications";
import {useIntl} from "react-intl";
import {useCallback, useMemo} from 'react';
import {EntityEditorCallbacks, useParentScreen} from "@haulmont/jmix-react-web";
import { EntityInstance } from "@haulmont/jmix-react-core";

export function useEntityEditorCallbacks<TEntity, TData>(options: {
  onCommit?: (entityInstance: EntityInstance<TEntity>) => void,
  routingPath: string,
}): EntityEditorCallbacks<TEntity, TData> {
  const intl = useIntl();
  const parentScreen = useParentScreen(options.routingPath);

  const onCommit = useMemo(() =>
    options.onCommit
      ? (entityInstance: EntityInstance<TEntity>) => {
        options.onCommit?.(entityInstance)
        parentScreen();
      }
      : undefined,
    [parentScreen, options.onCommit],
  );

  const onCreate = useCallback(() => {
    notifications.show({
      type: NotificationType.SUCCESS,
      description: intl.formatMessage({ id: "management.editor.created" })
    });
    parentScreen();
  }, [notifications, intl, parentScreen]);

  const onEdit = useCallback(() => {
    notifications.show({
      type: NotificationType.SUCCESS,
      description: intl.formatMessage({ id: "management.editor.updated" })
    });
    parentScreen();
  }, [notifications, intl, parentScreen]);

  const onError = useCallback(() => {
    notifications.show({
      type: NotificationType.ERROR,
      description: intl.formatMessage({ id: "common.requestFailed" })
    })
  }, [notifications, intl]);

  const onCloseForm = parentScreen;

  return {
    onCommit,
    onCreate,
    onEdit,
    onError,
    onCloseForm,
  };
}

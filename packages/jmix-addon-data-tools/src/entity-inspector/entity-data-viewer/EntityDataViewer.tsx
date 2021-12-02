import React, {useEffect, useCallback, useMemo} from 'react';
import { useEntityList, getEntityInstanceById } from "@haulmont/jmix-react-web";
import {
  ant_to_jmixFront, 
  DataTable, 
  RetryDialog, 
  saveHistory, 
  useEntityDeleteCallback, 
  useOpenScreenErrorCallback,
  notifications, 
  NotificationType
} from "@haulmont/jmix-react-antd";
import { DocumentNode, gql } from '@apollo/client';
import { EntityInstance, EntityPermAccessControl, generateTempId, useMetadata } from '@haulmont/jmix-react-core';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { observer } from 'mobx-react';
import {useEntityRestore} from "../entityRestore";
import { ViewerModes, EntityNamesInfo, ScreensControl } from '../EntityInspector.types';
import { generateGqlQueryDataList } from '../gqlQueryGeneration';

interface Props {
  mode: ViewerModes,
  entityList?: EntityInstance[],
  onEntityListChange?: (value?: EntityInstance[]) => void,
  onEntitySelect?: (id?: string) => void,
  entityNamesInfo: EntityNamesInfo,
  routingPath: string,
  entityAttrs: string[],
  screensControl: ScreensControl
}

export const EntityDataViewer = observer((props: Props) => {
  const {
    entityNamesInfo, 
    routingPath, 
    entityAttrs,
    mode,
    onEntitySelect,
    entityList,
    onEntityListChange,
    screensControl
  } = props;

  const {openEditorScreen, closeActiveScreen} = screensControl

  const {entityName} = entityNamesInfo;

  const intl = useIntl();

  const metadata = useMetadata();

  const listQuery: DocumentNode | null = useMemo(() => {
    const query = generateGqlQueryDataList(entityName, metadata, entityAttrs);
    return gql`${query}`;
    
  }, [entityNamesInfo, entityAttrs, metadata]);

  const onOpenScreenError = useOpenScreenErrorCallback();
  const onEntityDelete = useEntityDeleteCallback();

  const {
    items,
    count,
    relationOptions,
    executeListQuery,
    executeDeleteMutation,
    listQueryResult: { loading, error, refetch },
    handleSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handlePaginationChange,
    entityListState
  } = useEntityList<object>({
    listQuery,
    entityName,
    routingPath,
    entityList,
    onEntityListChange,
    onPagination: saveHistory,
    onEntityDelete,
    onOpenScreenError,
    listQueryOptions: {fetchPolicy: "network-only"}
  });

  const selectedEntityInstance = useMemo(() => {
    let instance;
    if(entityListState.selectedEntityId != null && items != null ) {
      try{
        instance = getEntityInstanceById(entityListState.selectedEntityId, items)
      } catch(_e) {
        instance = undefined;
      }
    }
   return instance;
  }, [entityListState.selectedEntityId, items])

  const restoreIds = useMemo(() => {
    if(entityListState.selectedEntityId == null) {
      return [];
    }
    return [entityListState.selectedEntityId];
  }, [entityListState.selectedEntityId]);

  const restoreEntity = useEntityRestore({className: entityName, ids: restoreIds}, refetch)

  const onEditCommit = useMemo(() => {
    return onEntityListChange
      ? (updatedEntity?: EntityInstance) => {
          if (updatedEntity) {
          const updatedEntityRenamed = {
            ...updatedEntity,
            // Changes made to the entity might have invalidated the instance name
            '_instanceName': intl.formatMessage({id: 'common.unsavedEntity'})
          };
          const newList = entityList?.map(originalEntity => {
            if (originalEntity.id === updatedEntityRenamed.id) {
              return updatedEntityRenamed;
            }
            return originalEntity;
          });
          onEntityListChange(newList);
          entityListState.entityList = newList;
        }
      }
    : undefined
  }, [onEntityListChange, entityListState, intl]);

  const onCreateCommit = useMemo(() => {
    return onEntityListChange
      ? (entityInstance?: EntityInstance) => {
        if (entityInstance) {
          const newEntityInstance = {
            ...entityInstance,
            id: generateTempId(),
            '_instanceName': intl.formatMessage({id: 'common.unsavedEntity'})
          };
          const currentEntityList = entityListState.entityList ? entityListState.entityList : [];
          onEntityListChange([
            newEntityInstance,
            ...currentEntityList
          ]);
        }
      }
    : undefined
  }, [onEntityListChange, entityListState, intl]);

  const handleDeleteBtnClick = useCallback(() => {
    if(entityListState.selectedEntityId != null) {
      onEntityDelete(() => {
        executeDeleteMutation({
          variables: {id: entityListState.selectedEntityId as string},
          onCompleted: () => {refetch?.()}
        }).catch((_e) => {
          notifications.show({
            type: NotificationType.ERROR,
            description: intl.formatMessage({
               id: "addons.DataTools.deleteEntityError" 
            }, {entityId: entityListState.selectedEntityId})
          });
        })
      }, selectedEntityInstance)
    };
  }, [entityListState.selectedEntityId, selectedEntityInstance]);

  const editBtnHandler = useCallback(() => {
    const value = entityList?.find(({id}) => {return id === entityListState!.selectedEntityId!});
    const entityInstance = value 
      ? ant_to_jmixFront(value, entityName, metadata) 
      : undefined
        openEditorScreen({
          screensControl,
          entityAttrs,
          entityNamesInfo,
          routingPath,
          onCommit: onEditCommit,
          entityInstance,
          entityId: entityListState!.selectedEntityId!
        }, `${entityNamesInfo.entityName} edit`);
  }, [entityAttrs, entityNamesInfo, entityListState, onEditCommit]);

  const createBtnHandler = useCallback(() => {
    openEditorScreen({
      screensControl,
      entityAttrs,
      entityNamesInfo,
      onCommit: onCreateCommit
    }, `${entityNamesInfo.entityName} create`);
  }, [entityAttrs, entityNamesInfo, entityListState]);

  const selectBtnHandler = useCallback(() => {
    onEntitySelect?.(entityListState.selectedEntityId);
  }, [entityListState.selectedEntityId]);

  const cancelSelectionBtnHandler = useCallback(() => {
    closeActiveScreen();
  }, []);

  useEffect(() => {
    handlePaginationChange();
  }, [entityName])

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  const buttons = mode === ViewerModes.Inspection
    ? [
      <EntityPermAccessControl
        entityName={entityName}
        operation="create"
        key="create"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          type="primary"
          icon={<PlusOutlined />}
          onClick={createBtnHandler}
        >
          <span>
            <FormattedMessage id="common.create" />
          </span>
        </Button>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={entityName}
        operation="update"
        key="update"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={entityListState.selectedEntityId == null}
          type="default"
          onClick={editBtnHandler}
        >
          <FormattedMessage id="common.edit" />
        </Button>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={entityName}
        operation="delete"
        key="delete"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={entityListState.selectedEntityId == null}
          onClick={handleDeleteBtnClick}
          key="remove"
          type="default"
        >
          <FormattedMessage id="common.remove" />
        </Button>
      </EntityPermAccessControl>,
      <Button
        htmlType="button"
        style={{ margin: "0 12px 12px 0" }}
        onClick={restoreEntity}
        key="restore"
        type="default"
        disabled={entityListState.selectedEntityId == null}
      >
        <FormattedMessage id="addons.DataTools.restoreButton" />
      </Button>
    ]
  : [];

  return (
    <>
      <DataTable
        items={items}
        count={count}
        relationOptions={relationOptions}
        current={entityListState.pagination?.current}
        pageSize={entityListState.pagination?.pageSize}
        entityName={entityName}
        loading={loading}
        error={error}
        columnDefinitions={entityAttrs}
        onRowSelectionChange={handleSelectionChange}
        onFilterChange={handleFilterChange}
        onSortOrderChange={handleSortOrderChange}
        onPaginationChange={handlePaginationChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
      {mode === ViewerModes.Selection && (
        <>
          <Button
            disabled={entityListState.selectedEntityId == null}
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            type="primary"
            onClick={selectBtnHandler}
          >
            <FormattedMessage id="addons.DataTools.select" />
          </Button>

          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            type="default"
            onClick={cancelSelectionBtnHandler}
          >
            <FormattedMessage id="common.cancel" />
          </Button>
        </>
      )}
    </>
  )
})

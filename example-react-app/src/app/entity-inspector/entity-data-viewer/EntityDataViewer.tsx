import React, {useEffect, useCallback, useMemo} from 'react';
import { DataTable, RetryDialog, useEntityList } from "@haulmont/jmix-react-ui";
import { DocumentNode, gql } from '@apollo/client';
import { EntityPermAccessControl, EntityNamesInfo, useMetadata } from '@haulmont/jmix-react-core';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { observer } from 'mobx-react';
import {EntityDataEditor} from "../entity-data-editor"
import { ScreenItem, ViewerModes } from '../EntityInspector';
import { generateGqlQuery, GqlQueryType } from '../gqlQueryGeneration';

interface Props {
  mode: ViewerModes,
  onEntitySelect?: (id?: string) => void,
  entityNamesInfo: EntityNamesInfo,
  routingPath: string,
  entityAttrs: string[],
  setScreens: React.Dispatch<React.SetStateAction<ScreenItem[]>>
}

export const EntityDataViewer = observer((props: Props) => {
  const {
    entityNamesInfo, 
    routingPath, 
    entityAttrs,
    setScreens,
    mode,
    onEntitySelect
  } = props

  const {entityName} = entityNamesInfo;

  const metadata = useMetadata()

  const listQuery: DocumentNode | null = useMemo(() => {
    const query = generateGqlQuery(entityNamesInfo, metadata, entityAttrs, GqlQueryType.DataList);
    return gql`${query}`;
    
  }, [entityNamesInfo, entityAttrs, metadata]);

  const {
    items,
    count,
    relationOptions,
    executeListQuery,
    listQueryResult: { loading, error },
    handleSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handlePaginationChange,
    handleDeleteBtnClick,
    entityListState
  } = useEntityList<object>({
    listQuery,
    entityName,
    routingPath
  });

  const editBtnHandler = useCallback(() => {
    setScreens((items: ScreenItem[]) => {
      return [
        ...items,
        {
          component: EntityDataEditor,
          props: {
            setScreens,
            entityAttrs,
            entityNamesInfo,
            routingPath,
            entityId: entityListState!.selectedEntityId!
          },
          caption: `${entityNamesInfo.entityName} edit`,
          id: items.length
        } 
      ]
    })
  }, [entityAttrs, entityNamesInfo, entityListState]);

  const createBtnHandler = useCallback(() => {
    setScreens((items: ScreenItem[]) => {
      return [
        ...items,
        {
          component: EntityDataEditor,
          props: {
            setScreens,
            entityAttrs,
            entityNamesInfo,
          },
          caption: `${entityNamesInfo.entityName} create`,
          id: items.length
        } 
      ]
    })
  }, [entityAttrs, entityNamesInfo, entityListState]);

  const selectBtnHandler = useCallback(() => {
    onEntitySelect?.(entityListState.selectedEntityId);
  }, [entityListState.selectedEntityId]);

  const cancelSelectionBtnHandler = useCallback(() => {
    setScreens((screens) => {
      return [...screens].slice(0, screens.length-1);
    })
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
      </EntityPermAccessControl>
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
      {mode === ViewerModes.ViewWithSelection && (
        <>
          <Button
            disabled={entityListState.selectedEntityId == null}
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            type="primary"
            onClick={selectBtnHandler}
          >
            Select
          </Button>

          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            type="default"
            onClick={cancelSelectionBtnHandler}
          >
            Cancel
          </Button>
        </>
      )}
    </>
  )
})

export type {
  Props as DataViewerProps
}

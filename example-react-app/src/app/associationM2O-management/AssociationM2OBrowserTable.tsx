import React, { ReactElement, useCallback } from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import {
  useEntityList,
  EntityListProps,
  registerEntityList,
  useDefaultBrowserTableHotkeys
} from "@haulmont/jmix-react-web";
import {
  DataTable,
  RetryDialog,
  useOpenScreenErrorCallback,
  useEntityDeleteCallback,
  saveHistory
} from "@haulmont/jmix-react-antd";
import { AssociationM2OTestEntity } from "../../jmix/entities/scr_AssociationM2OTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_AssociationM2OTestEntity";
const ROUTING_PATH = "/associationM2OBrowserTable";

const SCR_ASSOCIATIONM2OTESTENTITY_LIST = gql`
  query scr_AssociationM2OTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_AssociationM2OTestEntityOrderBy
    $filter: [inp_scr_AssociationM2OTestEntityFilterCondition]
  ) {
    scr_AssociationM2OTestEntityCount(filter: $filter)
    scr_AssociationM2OTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      name
    }
  }
`;

const AssociationM2OBrowserTable = observer(
  (props: EntityListProps<AssociationM2OTestEntity>) => {
    const {
      entityList,
      onEntityListChange,
      onSelectEntity,
      disabled: readOnlyMode
    } = props;
    const onOpenScreenError = useOpenScreenErrorCallback();
    const onEntityDelete = useEntityDeleteCallback();
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
      handleCreateBtnClick,
      handleEditBtnClick,
      goToParentScreen,
      entityListState
    } = useEntityList<AssociationM2OTestEntity>({
      listQuery: SCR_ASSOCIATIONM2OTESTENTITY_LIST,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityList,
      onEntityListChange,
      onPagination: saveHistory,
      onEntityDelete,
      onOpenScreenError
    });

    const selectEntityHandler = useCallback(() => {
      if (onSelectEntity != null) {
        const selectedEntityInstance = items?.find(
          ({ id }) => id === entityListState.selectedEntityId
        );
        onSelectEntity(selectedEntityInstance);
        goToParentScreen();
      }
    }, [
      onSelectEntity,
      entityListState.selectedEntityId,
      goToParentScreen,
      items
    ]);

    useDefaultBrowserTableHotkeys({
      selectedEntityId: entityListState.selectedEntityId,
      handleCreateBtnClick,
      handleEditBtnClick,
      handleDeleteBtnClick
    });

    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={executeListQuery} />;
    }

    let buttons: ReactElement[] = [];
    if (onSelectEntity != null) {
      buttons = [
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          type="primary"
          disabled={entityListState.selectedEntityId == null}
          onClick={selectEntityHandler}
          key="selectEntity"
        >
          <span>
            <FormattedMessage id="common.selectEntity" />
          </span>
        </Button>
      ];
    } else if (!readOnlyMode) {
      buttons = [
        <EntityPermAccessControl
          entityName={ENTITY_NAME}
          operation="create"
          key="create"
        >
          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateBtnClick}
          >
            <span>
              <FormattedMessage id="common.create" />
            </span>
          </Button>
        </EntityPermAccessControl>,
        <EntityPermAccessControl
          entityName={ENTITY_NAME}
          operation="update"
          key="update"
        >
          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            disabled={entityListState.selectedEntityId == null}
            type="default"
            onClick={handleEditBtnClick}
          >
            <FormattedMessage id="common.edit" />
          </Button>
        </EntityPermAccessControl>,
        <EntityPermAccessControl
          entityName={ENTITY_NAME}
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
      ];
    }

    if (entityList != null) {
      buttons.unshift(
        <Tooltip title={<FormattedMessage id="common.back" />} key="back">
          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            icon={<LeftOutlined />}
            onClick={goToParentScreen}
            key="back"
            type="default"
            shape="circle"
          />
        </Tooltip>
      );
    }

    return (
      <DataTable
        items={items}
        count={count}
        relationOptions={relationOptions}
        current={entityListState.pagination?.current}
        pageSize={entityListState.pagination?.pageSize}
        entityName={ENTITY_NAME}
        loading={loading}
        error={error}
        enableFiltersOnColumns={entityList != null ? [] : undefined}
        enableSortingOnColumns={entityList != null ? [] : undefined}
        columnDefinitions={["name"]}
        onRowSelectionChange={handleSelectionChange}
        onFilterChange={handleFilterChange}
        onSortOrderChange={handleSortOrderChange}
        onPaginationChange={handlePaginationChange}
        hideSelectionColumn={true}
        buttons={buttons}
      />
    );
  }
);

registerEntityList({
  component: AssociationM2OBrowserTable,
  caption: "screen.AssociationM2OBrowserTable",
  screenId: "AssociationM2OBrowserTable",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default AssociationM2OBrowserTable;

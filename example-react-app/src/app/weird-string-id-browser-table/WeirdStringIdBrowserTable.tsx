import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import {
  useEntityList,
  EntityListProps,
  registerEntityList
} from "@haulmont/jmix-react-web";
import {
  DataTable,
  RetryDialog,
  useOpenScreenErrorCallback,
  useEntityDeleteCallback,
  saveHistory
} from "@haulmont/jmix-react-antd";
import { WeirdStringIdTestEntity } from "../../jmix/entities/scr_WeirdStringIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdBrowserTable";

const SCR_WEIRDSTRINGIDTESTENTITY_LIST = gql`
  query scr_WeirdStringIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_WeirdStringIdTestEntityOrderBy
    $filter: [inp_scr_WeirdStringIdTestEntityFilterCondition]
  ) {
    scr_WeirdStringIdTestEntityCount(filter: $filter)
    scr_WeirdStringIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      identifier
      description
    }
  }
`;

const WeirdStringIdBrowserTable = observer(
  (props: EntityListProps<WeirdStringIdTestEntity>) => {
    const { entityList, onEntityListChange } = props;
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
    } = useEntityList<WeirdStringIdTestEntity>({
      listQuery: SCR_WEIRDSTRINGIDTESTENTITY_LIST,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityList,
      onEntityListChange,
      onPagination: saveHistory,
      onEntityDelete,
      onOpenScreenError
    });

    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={executeListQuery} />;
    }

    const buttons = [
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
        columnDefinitions={["id", "description"]}
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
  component: WeirdStringIdBrowserTable,
  caption: "screen.WeirdStringIdBrowserTable",
  screenId: "WeirdStringIdBrowserTable",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default WeirdStringIdBrowserTable;

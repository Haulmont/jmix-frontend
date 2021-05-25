import React, { useContext } from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import {
  EntityPermAccessControl,
  ScreensContext
} from "@haulmont/jmix-react-core";
import {
  DataTable,
  RetryDialog,
  useEntityList,
  EntityListProps,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";
import { TrickyIdTestEntity } from "../../jmix/entities/scr_TrickyIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_TrickyIdTestEntity";
const ROUTING_PATH = "/trickyIdBrowserTable";

const SCR_TRICKYIDTESTENTITY_LIST = gql`
  query scr_TrickyIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_TrickyIdTestEntityOrderBy
    $filter: [inp_scr_TrickyIdTestEntityFilterCondition]
    $loadItems: Boolean!
  ) {
    scr_TrickyIdTestEntityCount
    scr_TrickyIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) @include(if: $loadItems) {
      id
      _instanceName
      otherAttr
    }
  }
`;

const DELETE_SCR_TRICKYIDTESTENTITY = gql`
  mutation Delete_scr_TrickyIdTestEntity($id: String!) {
    delete_scr_TrickyIdTestEntity(id: $id)
  }
`;

const TrickyIdBrowserTable = observer(
  (props: EntityListProps<TrickyIdTestEntity>) => {
    const { entityList, onEntityListChange, reverseAttrName } = props;

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
    } = useEntityList<TrickyIdTestEntity>({
      listQuery: SCR_TRICKYIDTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_TRICKYIDTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityList,
      onEntityListChange,
      reverseAttrName
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
        <Tooltip title={<FormattedMessage id="common.back" />}>
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
        columnDefinitions={["otherAttr"].filter(
          columnDef => columnDef !== reverseAttrName
        )}
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

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "trickyIdBrowserTable",
  <TrickyIdBrowserTable />,
  ENTITY_NAME,
  "TrickyIdBrowserTable"
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "trickyIdBrowserTable",
  <TrickyIdBrowserTable />
);

export default TrickyIdBrowserTable;

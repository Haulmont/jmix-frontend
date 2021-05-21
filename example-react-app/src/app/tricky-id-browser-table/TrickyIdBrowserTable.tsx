import React, { useContext } from "react";
import { observer } from "mobx-react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  EntityPermAccessControl,
  ScreensContext
} from "@haulmont/jmix-react-core";
import {
  DataTable,
  RetryDialog,
  useEntityList,
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
  ) {
    scr_TrickyIdTestEntityCount
    scr_TrickyIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
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

const TrickyIdBrowserTable = observer(() => {
  const screens = useContext(ScreensContext);

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handlePaginationChange,
    deleteSelectedRow,
    handleCreateBtnClick,
    handleEditBtnClick,
    store
  } = useEntityList<TrickyIdTestEntity>({
    listQuery: SCR_TRICKYIDTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_TRICKYIDTESTENTITY,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
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
        disabled={store.selectedRowKey == null}
        type="default"
        onClick={handleEditBtnClick.bind(null, store.selectedRowKey)}
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
        disabled={store.selectedRowKey == null}
        onClick={deleteSelectedRow.bind(null, data?.scr_TrickyIdTestEntityList)}
        key="remove"
        type="default"
      >
        <FormattedMessage id="common.remove" />
      </Button>
    </EntityPermAccessControl>
  ];

  return (
    <DataTable
      data={data}
      current={store.pagination?.current}
      pageSize={store.pagination?.pageSize}
      entityName={ENTITY_NAME}
      loading={loading}
      error={error}
      columnDefinitions={["otherAttr"]}
      onRowSelectionChange={handleRowSelectionChange}
      onFilterChange={handleFilterChange}
      onSortOrderChange={handleSortOrderChange}
      onPaginationChange={handlePaginationChange}
      hideSelectionColumn={true}
      buttons={buttons}
    />
  );
});

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

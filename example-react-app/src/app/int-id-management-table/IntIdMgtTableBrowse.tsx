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
  Spinner,
  RetryDialog,
  useEntityTable
} from "@haulmont/jmix-react-ui";
import { IntegerIdTestEntity } from "../../jmix/entities/scr_IntegerIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const ROUTING_PATH = "/intIdManagementTable";

const FIELDS = ["description"];

const SCR_INTEGERIDTESTENTITY_LIST = gql`
  query scr_IntegerIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_IntegerIdTestEntityOrderBy
    $filter: [inp_scr_IntegerIdTestEntityFilterCondition]
  ) {
    scr_IntegerIdTestEntityCount
    scr_IntegerIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      description
    }
  }
`;

const DELETE_SCR_INTEGERIDTESTENTITY = gql`
  mutation Delete_scr_IntegerIdTestEntity($id: String!) {
    delete_scr_IntegerIdTestEntity(id: $id)
  }
`;

const IntIdMgtTableBrowse = observer(() => {
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
  } = useEntityTable<IntegerIdTestEntity>({
    listQuery: SCR_INTEGERIDTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_INTEGERIDTESTENTITY,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    queryName: "scr_IntegerIdTestEntityList"
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  const items = data?.scr_IntegerIdTestEntityList;
  const total = data?.scr_IntegerIdTestEntityCount;

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
        onClick={deleteSelectedRow.bind(null, items)}
        key="remove"
        type="default"
      >
        <FormattedMessage id="common.remove" />
      </Button>
    </EntityPermAccessControl>
  ];

  return (
    <DataTable
      items={items}
      total={total}
      offset={store.pagination?.offset}
      limit={store.pagination?.limit}
      entityName={ENTITY_NAME}
      loading={loading}
      error={error}
      columnDefinitions={FIELDS}
      onRowSelectionChange={handleRowSelectionChange}
      onFilterChange={handleFilterChange}
      onSortOrderChange={handleSortOrderChange}
      onPaginationChange={handlePaginationChange}
      hideSelectionColumn={true}
      buttons={buttons}
    />
  );
});

export default IntIdMgtTableBrowse;

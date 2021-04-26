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
import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdMgtTableManagement";

const FIELDS = ["description"];

const SCR_INTIDENTITYIDTESTENTITY_LIST = gql`
  query scr_IntIdentityIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_IntIdentityIdTestEntityOrderBy
    $filter: [inp_scr_IntIdentityIdTestEntityFilterCondition]
  ) {
    scr_IntIdentityIdTestEntityCount
    scr_IntIdentityIdTestEntityList(
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

const DELETE_SCR_INTIDENTITYIDTESTENTITY = gql`
  mutation Delete_scr_IntIdentityIdTestEntity($id: String!) {
    delete_scr_IntIdentityIdTestEntity(id: $id)
  }
`;

const IntIdentityIdMgtTableBrowse = observer(() => {
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
  } = useEntityTable<IntIdentityIdTestEntity>({
    listQuery: SCR_INTIDENTITYIDTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_INTIDENTITYIDTESTENTITY,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    queryName: "scr_IntIdentityIdTestEntityList"
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  const items = data?.scr_IntIdentityIdTestEntityList;
  const total = data?.scr_IntIdentityIdTestEntityCount;

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

export default IntIdentityIdMgtTableBrowse;

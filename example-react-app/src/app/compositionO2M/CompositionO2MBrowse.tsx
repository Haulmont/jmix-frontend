import React, { useContext } from "react";
import { observer } from "mobx-react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  EntityPermAccessControl,
  ScreensContext
} from "@haulmont/jmix-react-core";
import { DataTable, RetryDialog, useEntityList } from "@haulmont/jmix-react-ui";
import { CompositionO2MTestEntity } from "../../jmix/entities/scr_CompositionO2MTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_CompositionO2MTestEntity";
const ROUTING_PATH = "/compositionO2MManagement";

const FIELDS = ["name", "datatypesTestEntity"];

const ASSOCIATIONS = {
  datatypesTestEntity: "scr_DatatypesTestEntityList"
};

const SCR_COMPOSITIONO2MTESTENTITY_LIST = gql`
  query scr_CompositionO2MTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_CompositionO2MTestEntityOrderBy
    $filter: [inp_scr_CompositionO2MTestEntityFilterCondition]
  ) {
    scr_CompositionO2MTestEntityCount
    scr_CompositionO2MTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      name
      datatypesTestEntity {
        id
        _instanceName
      }
    }

    scr_DatatypesTestEntityList {
      id
      _instanceName
    }
  }
`;

const DELETE_SCR_COMPOSITIONO2MTESTENTITY = gql`
  mutation Delete_scr_CompositionO2MTestEntity($id: String!) {
    delete_scr_CompositionO2MTestEntity(id: $id)
  }
`;

const CompositionO2MBrowse = observer(() => {
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
    store,
    associationOptionsMap
  } = useEntityList<CompositionO2MTestEntity>({
    listQuery: SCR_COMPOSITIONO2MTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_COMPOSITIONO2MTESTENTITY,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    associations: ASSOCIATIONS
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  const items = data?.scr_CompositionO2MTestEntityList;
  const total = data?.scr_CompositionO2MTestEntityCount;

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
      current={store.pagination?.current}
      pageSize={store.pagination?.pageSize}
      entityName={ENTITY_NAME}
      associationOptionsMap={associationOptionsMap}
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

export default CompositionO2MBrowse;

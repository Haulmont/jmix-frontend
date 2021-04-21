import React from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  EntityPermAccessControl,
  useMainStore
} from "@haulmont/jmix-react-core";
import {
  DataTable,
  Spinner,
  RetryDialog,
  useEntityTable
} from "@haulmont/jmix-react-ui";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { PATH, NEW_SUBPATH } from "./DatatypesManagement3";
import { FormattedMessage } from "react-intl";
import { PaginationConfig } from "antd/es/pagination";
import { gql } from "@apollo/client";

const FIELDS = [
  "bigDecimalAttr",
  "booleanAttr",
  "dateAttr",
  "dateTimeAttr",
  "doubleAttr",
  "integerAttr",
  "longAttr",
  "stringAttr",
  "timeAttr",
  "uuidAttr",
  "localDateTimeAttr",
  "offsetDateTimeAttr",
  "localDateAttr",
  "localTimeAttr",
  "offsetTimeAttr",
  "enumAttr",
  "name",
  "readOnlyStringAttr"
];

const SCR_DATATYPESTESTENTITY_LIST = gql`
  query scr_DatatypesTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_DatatypesTestEntityOrderBy
    $filter: [inp_scr_DatatypesTestEntityFilterCondition]
  ) {
    scr_DatatypesTestEntityCount
    scr_DatatypesTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      bigDecimalAttr
      booleanAttr
      dateAttr
      dateTimeAttr
      doubleAttr
      integerAttr
      longAttr
      stringAttr
      timeAttr
      uuidAttr
      localDateTimeAttr
      offsetDateTimeAttr
      localDateAttr
      localTimeAttr
      offsetTimeAttr
      enumAttr
      name
      readOnlyStringAttr
    }
  }
`;

const DELETE_SCR_DATATYPESTESTENTITY = gql`
  mutation Delete_scr_DatatypesTestEntity($id: String!) {
    delete_scr_DatatypesTestEntity(id: $id)
  }
`;

const DatatypesBrowse3 = () => {
  const mainStore = useMainStore();

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    handleRowSelectionChange,
    handleFilterChange,
    handleSortOrderChange,
    handlePaginationChange,
    deleteSelectedRow,
    store
  } = useEntityTable<DatatypesTestEntity>({
    listQuery: SCR_DATATYPESTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_DATATYPESTESTENTITY,
    queryName: "scr_DatatypesTestEntity"
  });

  return useObserver(() => {
    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={loadItems} />;
    }

    if (loading || data == null || !mainStore.isEntityDataLoaded()) {
      return <Spinner />;
    }

    const items = data.scr_DatatypesTestEntityList;

    const buttons = [
      <EntityPermAccessControl
        entityName={DatatypesTestEntity.NAME}
        operation="create"
        key="create"
      >
        <Link to={PATH + "/" + NEW_SUBPATH} key="create">
          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            type="primary"
            icon={<PlusOutlined />}
          >
            <span>
              <FormattedMessage id="common.create" />
            </span>
          </Button>
        </Link>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={DatatypesTestEntity.NAME}
        operation="update"
        key="update"
      >
        <Link to={PATH + "/" + store.selectedRowKey} key="edit">
          <Button
            htmlType="button"
            style={{ margin: "0 12px 12px 0" }}
            disabled={store.selectedRowKey == null}
            type="default"
          >
            <FormattedMessage id="common.edit" />
          </Button>
        </Link>
      </EntityPermAccessControl>,
      <EntityPermAccessControl
        entityName={DatatypesTestEntity.NAME}
        operation="delete"
        key="delete"
      >
        <Button
          htmlType="button"
          style={{ margin: "0 12px 12px 0" }}
          disabled={store.selectedRowKey == null}
          onClick={deleteSelectedRow}
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
        entityName={DatatypesTestEntity.NAME}
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
};

export default DatatypesBrowse3;

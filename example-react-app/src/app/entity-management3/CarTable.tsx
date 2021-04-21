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
import { Car } from "../../jmix/entities/scr$Car";
import { PATH, NEW_SUBPATH } from "./CarManagement3";
import { FormattedMessage } from "react-intl";
import { PaginationConfig } from "antd/es/pagination";
import { gql } from "@apollo/client";

const FIELDS = [
  "manufacturer",
  "model",
  "regNumber",
  "purchaseDate",
  "manufactureDate",
  "wheelOnRight",
  "carType",
  "ecoRank",
  "maxPassengers",
  "price",
  "mileage",
  "garage",
  "technicalCertificate",
  "photo"
];

const SCR_CAR_LIST = gql`
  query scr_CarList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_CarOrderBy
    $filter: [inp_scr_CarFilterCondition]
  ) {
    scr_CarCount
    scr_CarList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      manufacturer
      model
      regNumber
      purchaseDate
      manufactureDate
      wheelOnRight
      carType
      ecoRank
      maxPassengers
      price
      mileage
      photo
    }
  }
`;

const DELETE_SCR_CAR = gql`
  mutation Delete_scr_Car($id: String!) {
    delete_scr_Car(id: $id)
  }
`;

const CarTable = () => {
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
  } = useEntityTable<Car>({
    listQuery: SCR_CAR_LIST,
    deleteMutation: DELETE_SCR_CAR,
    queryName: "scr_Car"
  });

  return useObserver(() => {
    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={loadItems} />;
    }

    if (loading || data == null || !mainStore.isEntityDataLoaded()) {
      return <Spinner />;
    }

    const items = data.scr_CarList;

    const buttons = [
      <EntityPermAccessControl
        entityName={Car.NAME}
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
        entityName={Car.NAME}
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
        entityName={Car.NAME}
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
        entityName={Car.NAME}
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

export default CarTable;

import React from "react";
import { observer } from "mobx-react";
import { DataTable, RetryDialog } from "@haulmont/jmix-react-antd";
import { useEntityList, registerScreen } from "@haulmont/jmix-react-web";
import { gql } from "@apollo/client";
import { Car } from "../../jmix/entities/scr_Car";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/carTableWithFilters";

const SCR_CAR_LIST = gql`
  query scr_CarList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_CarOrderBy
    $filter: [inp_scr_CarFilterCondition]
  ) {
    scr_CarCount(filter: $filter)
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
      garage {
        id
        _instanceName
      }
      technicalCertificate {
        id
        _instanceName
      }

      version
      createdBy
      createdDate
      lastModifiedBy
      lastModifiedDate
    }
  }
`;

const CarTableWithFilters = observer(() => {
  const {
    items,
    count,
    relationOptions,
    listQueryResult: { loading, error },
    entityListState,
    executeListQuery,
    handlePaginationChange,
    handleSelectionChange,
    handleFilterChange,
    handleSortOrderChange
  } = useEntityList<Car>({
    listQuery: SCR_CAR_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    lazyLoading: true
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
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
      enableFiltersOnColumns={["model", "manufacturer", "carType"]}
      enableSortingOnColumns={[]}
      columnDefinitions={[
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
        "technicalCertificate"
      ]}
      onRowSelectionChange={handleSelectionChange}
      onFilterChange={handleFilterChange}
      onSortOrderChange={handleSortOrderChange}
      onPaginationChange={handlePaginationChange}
      hideSelectionColumn={true}
      executeListQuery={executeListQuery}
    />
  );
});

registerScreen({
  component: CarTableWithFilters,
  caption: "screen.CarTableWithFilters",
  screenId: "CarTableWithFilters",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default CarTableWithFilters;

import React from "react";
import { observer } from "mobx-react";
import { PlusOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { EntityPermAccessControl } from "@haulmont/jmix-react-core";
import {
  DataTableGen,
  RetryDialog,
  useEntityList,
  EntityListProps,
  registerEntityList,
  withTableData,
  DataTableContainer

} from "@haulmont/jmix-react-ui";
import { Car } from "../../jmix/entities/scr_Car";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/carBrowserTable";

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

    scr_GarageList {
      id
      _instanceName
    }

    scr_TechnicalCertificateList {
      id
      _instanceName
    }
  }
`;

const CarBrowserTable = observer((props: EntityListProps<Car>) => {
  const { entityList, onEntityListChange } = props;

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
  } = useEntityList<Car>({
    listQuery: SCR_CAR_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    entityList,
    onEntityListChange
  });

  const dataForTableHoc = {
      items,
      count,
      relationOptions,
      handleSelectionChange,
      handleFilterChange,
      handleSortOrderChange,
      handlePaginationChange,
      loading,
      error,
      columnDefinitions: [
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
      ]
    }

//-------------HOC----------------------------------------------------
  const CustomTableForHocing: React.FC = (props: any) => {
    return (
      <div>
        Custom Hocked Table
        {props.data.items?.map((item) => {
          return (
            <div>
              {item.carType}
            </div>
          )
        })}
      </div>
    )
  }

  const HocedTable = withTableData(dataForTableHoc)(DataTableContainer as React.FC<any>);
  const HocedCustomTable = withTableData(dataForTableHoc)<any>(CustomTableForHocing);
//---------------------------------------------------------------------

//--------------- With adapter ----------------------------------------
interface CustomTableProps {
  customItems: any
}

const customTableAdapter = (props: any) => {
  return {
    customItems: props.items
  }
}

const MyCustomTable = ({ customItems }: CustomTableProps) => {
  return (
    <div>
      Custom Table
      {customItems?.map((item) => {
        return (
          <div>
            {item.carType}
          </div>
        )
      })}
    </div>
  )
}
//--------------------------------------------------------------------

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
    <>
      <DataTableGen
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
        buttons={buttons}
        tableComponent={MyCustomTable}
        tablePropsAdapter={customTableAdapter}
      />

      <HocedTable
        current={entityListState.pagination?.current}
        pageSize={entityListState.pagination?.pageSize}
        entityName={ENTITY_NAME}
        hideSelectionColumn={true}
        buttons={buttons}
      />

      <HocedCustomTable/>
    </>

  );
});


registerEntityList({
  component: CarBrowserTable,
  caption: "screen.CarBrowserTable",
  screenId: "CarBrowserTable",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default CarBrowserTable;

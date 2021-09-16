import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Row, Col, Card } from "antd";
import { Car } from "jmix/entities/scr_Car";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  useEntityList,
  registerScreen,
  defaultGridPaginationConfig
} from "@haulmont/jmix-react-web";
import {
  Paging,
  Spinner,
  RetryDialog,
  saveHistory
} from "@haulmont/jmix-react-antd";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";
import styles from "app/App.module.css";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/carCardsGrid";

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

const CarCardsGrid = observer(() => {
  const {
    items,
    count,
    executeListQuery,
    listQueryResult: { loading, error },
    handlePaginationChange,
    entityListState
  } = useEntityList<Car>({
    listQuery: SCR_CAR_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    paginationConfig: defaultGridPaginationConfig,
    onPagination: saveHistory
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || items == null) {
    return <Spinner />;
  }

  return (
    <div className={styles.narrowLayout}>
      <Row gutter={[12, 12]}>
        {items.map(item => (
          <Col key={item.id ? getStringId(item.id) : undefined} xl={8} sm={24}>
            <Card title={item._instanceName} style={{ height: "100%" }}>
              {getFields(item).map(fieldName => (
                <EntityProperty
                  entityName={Car.NAME}
                  propertyName={fieldName}
                  value={item[fieldName]}
                  key={fieldName}
                />
              ))}
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ margin: "12px 0 12px 0", float: "right" }}>
        <Paging
          paginationConfig={entityListState.pagination ?? {}}
          onPagingChange={handlePaginationChange}
          total={count}
        />
      </div>
    </div>
  );
});

registerScreen({
  component: CarCardsGrid,
  caption: "screen.CarCardsGrid",
  screenId: "CarCardsGrid",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default CarCardsGrid;

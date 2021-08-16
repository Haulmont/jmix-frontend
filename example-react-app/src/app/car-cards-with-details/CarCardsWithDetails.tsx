import React from "react";
import { observer } from "mobx-react";
import { Card, Space, Collapse } from "antd";
import {
  EntityInstance,
  getFields,
  toIdString
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  useEntityList,
  registerScreen
} from "@haulmont/jmix-react-web";
import {
  Paging,
  Spinner,
  RetryDialog,
  saveHistory
} from "@haulmont/jmix-react-antd";
import { Car } from "../../jmix/entities/scr_Car";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/carCardsWithDetails";

const MAIN_FIELDS = ["model", "manufacturer", "carType"];

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

const CarCardsWithDetails = observer(() => {
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
      {items.map((item: EntityInstance<Car>) => (
        <Card
          title={item._instanceName}
          key={item.id ? toIdString(item.id) : undefined}
          style={{ marginBottom: "12px" }}
        >
          <Space direction="vertical" size="large">
            <Space direction="vertical">
              {getFields(item)
                .filter(fieldName => MAIN_FIELDS.includes(fieldName))
                .map(fieldName => (
                  <EntityProperty
                    entityName={ENTITY_NAME}
                    propertyName={fieldName}
                    value={item[fieldName]}
                    key={fieldName}
                  />
                ))}
            </Space>

            <Collapse ghost style={{ marginLeft: -16, marginRight: -16 }}>
              <Collapse.Panel header="Show details" key="1">
                {getFields(item)
                  .filter(fieldName => !MAIN_FIELDS.includes(fieldName))
                  .map(fieldName => (
                    <EntityProperty
                      entityName={ENTITY_NAME}
                      propertyName={fieldName}
                      value={item[fieldName]}
                      key={fieldName}
                    />
                  ))}
              </Collapse.Panel>
            </Collapse>
          </Space>
        </Card>
      ))}

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
  component: CarCardsWithDetails,
  caption: "screen.CarCardsWithDetails",
  screenId: "CarCardsWithDetails",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default CarCardsWithDetails;

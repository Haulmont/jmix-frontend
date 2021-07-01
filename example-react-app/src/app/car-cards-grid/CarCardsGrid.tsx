import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Row, Col, Card } from "antd";
import { Car } from "../../jmix/entities/scr_Car";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  defaultGridPaginationConfig,
  EntityProperty,
  Paging,
  RetryDialog,
  Spinner,
  useEntityList,
  registerScreen
} from "@haulmont/jmix-react-ui";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";

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

export const CarCardsGrid = observer(() => {
  const {
    executeListQuery,
    listQueryResult: { loading, error, data },
    handlePaginationChange,
    entityListState
  } = useEntityList<Car>({
    listQuery: SCR_CAR_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    paginationConfig: defaultGridPaginationConfig
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data?.scr_CarList ?? [];
  const pagesTotal = data?.scr_CarCount ?? 0;

  return (
    <div className="narrow-layout">
      <Row gutter={[12, 12]}>
        {dataSource.map(e => (
          <Col key={e.id ? getStringId(e.id) : undefined} xl={8} sm={24}>
            <Card title={e._instanceName} style={{ height: "100%" }}>
              {getFields(e).map(p => (
                <EntityProperty
                  entityName={Car.NAME}
                  propertyName={p}
                  value={e[p]}
                  key={p}
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
          total={pagesTotal}
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

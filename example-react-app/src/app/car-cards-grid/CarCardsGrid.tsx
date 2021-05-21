import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Row, Col, Card } from "antd";
import { Car } from "../../jmix/entities/scr$Car";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  defaultGridPaginationConfig,
  EntityProperty,
  Paging,
  RetryDialog,
  Spinner,
  useEntityList,
  registerRoute
} from "@haulmont/jmix-react-ui";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/carCardsGrid";

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
      garage {
        id
        _instanceName
      }
      technicalCertificate {
        id
        _instanceName
      }
      photo

      version
      createdBy
      createdDate
      lastModifiedBy
      lastModifiedDate
    }
  }
`;

const DELETE_SCR_CAR = gql`
  mutation Delete_scr_Car($id: String!) {
    delete_scr_Car(id: $id)
  }
`;

export const CarCardsGrid = observer(() => {
  const screens = useContext(ScreensContext);

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    handlePaginationChange,
    store
  } = useEntityList<Car>({
    listQuery: SCR_CAR_LIST,
    deleteMutation: DELETE_SCR_CAR,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    queryName: "scr_CarList",
    paginationConfig: defaultGridPaginationConfig
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
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
          paginationConfig={store.pagination ?? {}}
          onPagingChange={handlePaginationChange}
          total={pagesTotal}
        />
      </div>
    </div>
  );
});

registerRoute(
  ROUTING_PATH,
  ROUTING_PATH,
  "CarCardsGrid",
  <CarCardsGrid />,
  ENTITY_NAME,
  "CarCardsGrid"
);

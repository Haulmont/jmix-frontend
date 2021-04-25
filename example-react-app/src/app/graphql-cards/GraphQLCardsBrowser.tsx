import React, { useContext } from "react";
import { observer } from "mobx-react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import {
  EntityInstance,
  getFields,
  EntityPermAccessControl,
  toIdString,
  ScreensContext
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  Spinner,
  RetryDialog,
  useEntityList
} from "@haulmont/jmix-react-ui";
import { Car } from "../../jmix/entities/scr$Car";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/graphQLCardsManagement";

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

const GraphQLCardsBrowser = observer(() => {
  const screens = useContext(ScreensContext);

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    showDeletionDialog,
    handleCreateBtnClick,
    handleEditBtnClick
  } = useEntityList<Car>({
    listQuery: SCR_CAR_LIST,
    deleteMutation: DELETE_SCR_CAR,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data.scr_CarList;
  const pagesTotal = data.scr_CarCount;

  return (
    <div className="narrow-layout">
      <EntityPermAccessControl entityName={ENTITY_NAME} operation="create">
        <div style={{ marginBottom: "12px" }}>
          <Button
            htmlType="button"
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreateBtnClick}
          >
            <span>
              <FormattedMessage id="common.create" />
            </span>
          </Button>
        </div>
      </EntityPermAccessControl>

      {dataSource == null || dataSource.length === 0 ? (
        <p>
          <FormattedMessage id="management.browser.noItems" />
        </p>
      ) : null}
      {dataSource.map((e: EntityInstance<Car>) => (
        <Card
          title={e._instanceName}
          key={e.id ? toIdString(e.id) : undefined}
          style={{ marginBottom: "12px" }}
          actions={[
            <EntityPermAccessControl
              entityName={ENTITY_NAME}
              operation="delete"
            >
              <DeleteOutlined
                key="delete"
                onClick={showDeletionDialog.bind(null, e)}
              />
            </EntityPermAccessControl>,
            <EntityPermAccessControl
              entityName={ENTITY_NAME}
              operation="update"
            >
              <EditOutlined
                key="edit"
                onClick={handleEditBtnClick.bind(null, e.id)}
              />
            </EntityPermAccessControl>
          ]}
        >
          {getFields(e).map(p => (
            <EntityProperty
              entityName={ENTITY_NAME}
              propertyName={p}
              value={e[p]}
              key={p}
            />
          ))}
        </Card>
      ))}

      {/* TODO pagination
      {!paginationConfig.disabled && (
        <div style={{ margin: "12px 0 12px 0", float: "right" }}>
          <Paging
            paginationConfig={paginationConfig}
            onPagingChange={onPagingChange}
            total={pagesTotal}
          />
        </div>
      )}
      */}
    </div>
  );
});

export default GraphQLCardsBrowser;
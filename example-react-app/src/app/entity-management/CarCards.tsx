import React from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import {
  EntityInstance,
  EntityPermAccessControl,
  toIdString,
  getFields,
  useMainStore
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  Spinner,
  RetryDialog,
  useEntityList,
  convertPaginationAntd2Jmix
} from "@haulmont/jmix-react-ui";
import { Car } from "../../jmix/entities/scr$Car";
import { PATH, NEW_SUBPATH } from "./CarManagement";
import { FormattedMessage } from "react-intl";
import { PaginationConfig } from "antd/es/pagination";
import { gql } from "@apollo/client";

type Props = {
  paginationConfig: PaginationConfig;
  onPagingChange: (current: number, pageSize: number) => void;
};

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

const CarCards = (props: Props) => {
  const { paginationConfig, onPagingChange } = props;

  const mainStore = useMainStore();

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    showDeletionDialog
  } = useEntityList<Car>({
    listQuery: SCR_CAR_LIST,
    listQueryOptions: {
      variables: {
        ...convertPaginationAntd2Jmix(paginationConfig)
      }
    },
    deleteMutation: DELETE_SCR_CAR
  });

  return useObserver(() => {
    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={loadItems} />;
    }

    if (loading || data == null || !mainStore.isEntityDataLoaded()) {
      return <Spinner />;
    }

    const dataSource = data.scr_CarList;
    const pagesTotal = data.scr_CarCount;

    return (
      <div className="narrow-layout">
        <EntityPermAccessControl entityName={Car.NAME} operation="create">
          <div style={{ marginBottom: "12px" }}>
            <Link to={PATH + "/" + NEW_SUBPATH}>
              <Button htmlType="button" type="primary" icon={<PlusOutlined />}>
                <span>
                  <FormattedMessage id="common.create" />
                </span>
              </Button>
            </Link>
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
              <EntityPermAccessControl entityName={Car.NAME} operation="delete">
                <DeleteOutlined
                  key="delete"
                  onClick={() => showDeletionDialog(e)}
                />
              </EntityPermAccessControl>,
              <EntityPermAccessControl entityName={Car.NAME} operation="update">
                <Link to={PATH + "/" + toIdString(e.id!)} key="edit">
                  <EditOutlined />
                </Link>
              </EntityPermAccessControl>
            ]}
          >
            {getFields(e).map(p => (
              <EntityProperty
                entityName={Car.NAME}
                propertyName={p}
                value={e[p]}
                key={p}
              />
            ))}
          </Card>
        ))}

        {!paginationConfig.disabled && (
          <div style={{ margin: "12px 0 12px 0", float: "right" }}>
            <Paging
              paginationConfig={paginationConfig}
              onPagingChange={onPagingChange}
              total={pagesTotal}
            />
          </div>
        )}
      </div>
    );
  });
};

export default CarCards;

import React from "react";
import { useObserver } from "mobx-react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
import {
  EntityProperty,
  Paging,
  Spinner,
  RetryDialog
} from "@haulmont/jmix-react-ui";
import { Car } from "../../jmix/entities/scr$Car";
import { PATH, NEW_SUBPATH } from "./GraphQLManagement";
import { FormattedMessage, useIntl } from "react-intl";
import { PaginationConfig } from "antd/es/pagination";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import {getFields, EntityInstance} from "./lib/jmix-react-core";
import {useDeletionDialogCallback, useEntityCollection} from "./lib/jmix-react-ui";

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
    }
  }
`;

const DELETE_SCR_CAR = gql`
  mutation Delete_scr_Car($id: String!) {
    delete_scr_Car(id: $id)
  }
`;

const GraphQLList = (props: Props) => {
  const { paginationConfig, onPagingChange } = props;

  const intl = useIntl();

  const [loadItems, { loading, error, data }] = useLazyQuery(SCR_CAR_LIST);
  const [deleteItem] = useMutation(DELETE_SCR_CAR);

  // Make sure items are loaded
  useEntityCollection({ loadItems, paginationConfig });

  const showDeletionDialog = useDeletionDialogCallback<Car>(intl, deleteItem);

  return useObserver(() => {
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
        <div style={{ marginBottom: "12px" }}>
          <Link to={PATH + "/" + NEW_SUBPATH}>
            <Button htmlType="button" type="primary" icon={<PlusOutlined />}>
              <span>
                <FormattedMessage id="common.create" />
              </span>
            </Button>
          </Link>
        </div>

        <List
          itemLayout="horizontal"
          bordered
          dataSource={dataSource}
          renderItem={(item: EntityInstance<Car>) => (
            <List.Item
              actions={[
                <DeleteOutlined
                  key="delete"
                  onClick={() => showDeletionDialog(item)}
                />,
                <Link to={PATH + "/" + item.id} key="edit">
                  <EditOutlined />
                </Link>
              ]}
            >
              <div style={{ flexGrow: 1 }}>
                {getFields(item).map(p => (
                  <EntityProperty
                    entityName={Car.NAME}
                    propertyName={p}
                    value={item[p]}
                    key={p}
                  />
                ))}
              </div>
            </List.Item>
          )}
        />

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

export default GraphQLList;

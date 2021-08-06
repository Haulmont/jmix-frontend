import React from "react";
import { observer } from "mobx-react";
import { gql, useQuery } from "@apollo/client";
import { registerEntityList } from "@haulmont/jmix-react-ui";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined
} from "@ant-design/icons";
import { Button, Card, Tooltip, List } from "antd";
import { FormattedMessage } from "react-intl";

const ENTITY_NAME = "[HARDCODED ENTITY NAME]";
const ROUTING_PATH = "/mvpScreen";

const SCR__CAR_LIST = gql`
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

const MvpScreen = observer(() => {
  const { loading, error, data } = useQuery(SCR__CAR_LIST);

  if (loading) {
    return <>'Loading...'</>;
  }

  if (error) {
    return <>'Error :('</>;
  }

  const items = data?.["scr_CarList"];

  if (items == null || items.length === 0) {
    return (
      <p>
        <FormattedMessage id="management.browser.noItems" />
      </p>
    );
  }

  return (
    <div className="narrow-layout">
      <div style={{ marginBottom: "12px" }}>
        <Button
          htmlType="button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => alert("not implemented")}
        >
          <span>
            <FormattedMessage id="common.create" />
          </span>
        </Button>
      </div>
      // TODO: entity instance typing
      {items.map((e: any) => (
        // TODO: id name field
        <Card
          key={e.id}
          style={{ marginBottom: "12px" }}
          actions={[
            <DeleteOutlined
              key="delete"
              onClick={(event?: React.MouseEvent) => alert(`delete ${e.id}`)}
            />,
            <EditOutlined
              key="edit"
              onClick={(event?: React.MouseEvent) => alert(`edit ${e.id}`)}
            />
          ]}
        >
          {Object.keys(e).map(p => (
            <div>
              <strong>{p}: </strong>
              {typeof e[p] === 'object' ? JSON.stringify(e[p]) : e[p]}
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
});

registerEntityList({
  component: MvpScreen,
  caption: "screen.MvpScreen",
  screenId: "MvpScreen",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default MvpScreen;

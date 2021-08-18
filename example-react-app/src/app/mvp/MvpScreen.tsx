import React, { useCallback } from "react";
import { observer } from "mobx-react";
import {
  gql,
  useQuery,
  useMutation,
  ApolloCache,
  Reference
} from "@apollo/client";
import {
  registerEntityList,
  openEntityEditorScreen
} from "@haulmont/jmix-react-ui";
import { useScreens } from "@haulmont/jmix-react-core";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined
} from "@ant-design/icons";
import { Button, Card, Tooltip, List, Modal, Spin, Empty, Result } from "antd";
import { FormattedMessage, useIntl } from "react-intl";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/mvpScreen";

const SCR__CAR_LIST = gql`
  query scr_CarList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_CarOrderBy
    $filter: [inp_scr_CarFilterCondition]
  ) {
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

const DELETE_SCR__CAR = gql`
  mutation Delete_scr_Car($id: String!) {
    delete_scr_Car(id: $id)
  }
`;

const MvpScreen = observer(() => {
  const screens = useScreens();
  const intl = useIntl();

  const { loading, error, data } = useQuery(SCR__CAR_LIST);
  const [executeDeleteMutation] = useMutation(DELETE_SCR__CAR);

  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <Result status="error" title="Query failed" />;
  }

  const items = data?.["scr_CarList"];

  if (items == null || items.length === 0) {
    return <Empty />;
  }

  return (
    <div className="narrow-layout">
      <div style={{ marginBottom: "12px" }}>
        <Button
          htmlType="button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            openEntityEditorScreen({
              screens,
              entityName: ENTITY_NAME,
              intl
            });
            window.scrollTo(0, 0);
          }}
        >
          <span>
            <FormattedMessage id="common.create" />
          </span>
        </Button>
      </div>

      {items.map((e: any) => (
        // TODO: id name field
        <Card
          key={e["id"]}
          title={e["_instanceName"]}
          style={{ marginBottom: "12px" }}
          actions={[
            <DeleteOutlined
              key="delete"
              onClick={() => {
                Modal.confirm({
                  content: "Are you sure you want to delete this record?",
                  okText: "OK",
                  cancelText: intl.formatMessage({ id: "common.cancel" }),
                  onOk: () => {
                    executeDeleteMutation({
                      variables: {
                        id: e.id
                      },
                      // TODO we should probably not use cache by default for simplicity
                      update(cache: ApolloCache<any>) {
                        cache.modify({
                          fields: {
                            ["scr_CarList"](existingRefs, { readField }) {
                              return existingRefs.filter(
                                (ref: Reference) =>
                                  e["id"] !== readField("id", ref)
                              );
                            }
                          }
                        });
                      }
                    });
                  }
                });
              }}
            />,
            <EditOutlined
              key="edit"
              onClick={() => {
                openEntityEditorScreen({
                  screens,
                  entityName: ENTITY_NAME,
                  intl,
                  entityIdToLoad: e.id,
                  routingPath: ROUTING_PATH // TODO: can we get rid of it?
                });
                window.scrollTo(0, 0);
              }}
            />
          ]}
        >
          <Fields entity={e} />
        </Card>
      ))}
    </div>
  );
});

interface FieldsProps {
  entity: any;
}

const Fields = (props: FieldsProps) => {
  const { entity } = props;
  return (
    <>
      {Object.keys(entity)
        .filter(p => p !== "id" && p !== "_instanceName" && entity[p] != null)
        .map(p => (
          <div>
            <strong>{renderLabel(p)}:</strong> {renderFieldValue(entity, p)}
          </div>
        ))}
    </>
  );
};

function renderFieldValue(entity: any, property: string): string {
  return typeof entity[property] === "object"
    ? JSON.stringify(entity[property])
    : entity[property].toString();
}

function renderLabel(property: string): string {
  const split = property.replace(/([^A-Z])([A-Z])/g, "$1 $2");
  return split[0].toUpperCase() + split.slice(1);
}

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

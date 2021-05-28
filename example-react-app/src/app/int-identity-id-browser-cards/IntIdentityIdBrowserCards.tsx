import React, { useContext } from "react";
import { observer } from "mobx-react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined
} from "@ant-design/icons";
import { Button, Card, Tooltip } from "antd";
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
  useEntityList,
  EntityListProps,
  registerEntityBrowserScreen,
  registerRoute
} from "@haulmont/jmix-react-ui";
import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdBrowserCards";

const SCR_INTIDENTITYIDTESTENTITY_LIST = gql`
  query scr_IntIdentityIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_IntIdentityIdTestEntityOrderBy
    $filter: [inp_scr_IntIdentityIdTestEntityFilterCondition]
  ) {
    scr_IntIdentityIdTestEntityCount
    scr_IntIdentityIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      description

      updateTs
      updatedBy
      deleteTs
      deletedBy
      createTs
      createdBy
      version

      datatypesTestEntity {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
    }
  }
`;

const DELETE_SCR_INTIDENTITYIDTESTENTITY = gql`
  mutation Delete_scr_IntIdentityIdTestEntity($id: String!) {
    delete_scr_IntIdentityIdTestEntity(id: $id)
  }
`;

const IntIdentityIdBrowserCards = observer(
  (props: EntityListProps<IntIdentityIdTestEntity>) => {
    const { entityList, onEntityListChange } = props;

    const {
      items,
      count,
      executeListQuery,
      listQueryResult: { loading, error },
      handleDeleteBtnClick,
      handleCreateBtnClick,
      handleEditBtnClick,
      handlePaginationChange,
      goToParentScreen,
      entityListState
    } = useEntityList<IntIdentityIdTestEntity>({
      listQuery: SCR_INTIDENTITYIDTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_INTIDENTITYIDTESTENTITY,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityList,
      onEntityListChange
    });

    if (error != null) {
      console.error(error);
      return <RetryDialog onRetry={executeListQuery} />;
    }

    if (loading || items == null) {
      return <Spinner />;
    }

    return (
      <div className="narrow-layout">
        {entityList != null && (
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
        )}

        <EntityPermAccessControl entityName={ENTITY_NAME} operation="create">
          <span style={{ marginBottom: "12px" }}>
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
          </span>
        </EntityPermAccessControl>

        {items == null || items.length === 0 ? (
          <p>
            <FormattedMessage id="management.browser.noItems" />
          </p>
        ) : null}
        {items.map((e: EntityInstance<IntIdentityIdTestEntity>) => (
          <Card
            title={e._instanceName}
            key={e.id ? toIdString(e.id) : undefined}
            style={{ marginBottom: "12px" }}
            actions={[
              <EntityPermAccessControl
                entityName={ENTITY_NAME}
                operation="delete"
              >
                <DeleteOutlined key="delete" onClick={handleDeleteBtnClick} />
              </EntityPermAccessControl>,
              <EntityPermAccessControl
                entityName={ENTITY_NAME}
                operation="update"
              >
                <EditOutlined key="edit" onClick={handleEditBtnClick} />
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

        <div style={{ margin: "12px 0 12px 0", float: "right" }}>
          <Paging
            paginationConfig={entityListState.pagination ?? {}}
            onPagingChange={handlePaginationChange}
            total={count}
          />
        </div>
      </div>
    );
  }
);

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "intIdentityIdBrowserCards",
  <IntIdentityIdBrowserCards />,
  ENTITY_NAME,
  "IntIdentityIdBrowserCards"
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "intIdentityIdBrowserCards",
  <IntIdentityIdBrowserCards />
);

export default IntIdentityIdBrowserCards;

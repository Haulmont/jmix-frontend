import React from "react";
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
  toIdString
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  useEntityList,
  EntityListProps,
  registerEntityList
} from "@haulmont/jmix-react-web";
import {
  Paging,
  Spinner,
  RetryDialog,
  useOpenScreenErrorCallback,
  useEntityDeleteCallback,
  saveHistory
} from "@haulmont/jmix-react-antd";
import { IntegerIdTestEntity } from "../../jmix/entities/scr_IntegerIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";

const ENTITY_NAME = "scr_IntegerIdTestEntity";
const ROUTING_PATH = "/intIdBrowserCards";

const SCR_INTEGERIDTESTENTITY_LIST = gql`
  query scr_IntegerIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_IntegerIdTestEntityOrderBy
    $filter: [inp_scr_IntegerIdTestEntityFilterCondition]
  ) {
    scr_IntegerIdTestEntityCount(filter: $filter)
    scr_IntegerIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      description
    }
  }
`;

const IntIdBrowserCards = observer(
  (props: EntityListProps<IntegerIdTestEntity>) => {
    const { entityList, onEntityListChange } = props;
    const onOpenScreenError = useOpenScreenErrorCallback();
    const onEntityDelete = useEntityDeleteCallback();
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
    } = useEntityList<IntegerIdTestEntity>({
      listQuery: SCR_INTEGERIDTESTENTITY_LIST,
      entityName: ENTITY_NAME,
      routingPath: ROUTING_PATH,
      entityList,
      onEntityListChange,
      onPagination: saveHistory,
      onEntityDelete,
      onOpenScreenError
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
        <div style={{ marginBottom: "12px" }}>
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
            <span>
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
        </div>

        {items == null || items.length === 0 ? (
          <p>
            <FormattedMessage id="management.browser.noItems" />
          </p>
        ) : null}
        {items.map((e: EntityInstance<IntegerIdTestEntity>) => (
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
                  onClick={(event?: React.MouseEvent) =>
                    handleDeleteBtnClick(event, e.id)
                  }
                />
              </EntityPermAccessControl>,
              <EntityPermAccessControl
                entityName={ENTITY_NAME}
                operation="update"
              >
                <EditOutlined
                  key="edit"
                  onClick={(event?: React.MouseEvent) =>
                    handleEditBtnClick(event, e.id)
                  }
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

registerEntityList({
  component: IntIdBrowserCards,
  caption: "screen.IntIdBrowserCards",
  screenId: "IntIdBrowserCards",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default IntIdBrowserCards;

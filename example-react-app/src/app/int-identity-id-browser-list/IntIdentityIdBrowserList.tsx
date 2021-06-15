import React from "react";
import { observer } from "mobx-react";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  LeftOutlined
} from "@ant-design/icons";
import { Button, List, Tooltip } from "antd";
import {
  EntityInstance,
  getFields,
  EntityPermAccessControl,
  ScreensContext
} from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  Spinner,
  RetryDialog,
  useEntityList,
  EntityListProps,
  registerScreen
} from "@haulmont/jmix-react-ui";
import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdBrowserList";

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

const IntIdentityIdBrowserList = observer(
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

        <List
          itemLayout="horizontal"
          bordered
          dataSource={items}
          renderItem={(item: EntityInstance<IntIdentityIdTestEntity>) => (
            <List.Item
              actions={[
                <EntityPermAccessControl
                  entityName={ENTITY_NAME}
                  operation="delete"
                >
                  <DeleteOutlined
                    key="delete"
                    onClick={(event?: React.MouseEvent) =>
                      handleDeleteBtnClick(event, item.id)
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
                      handleEditBtnClick(event, item.id)
                    }
                  />
                </EntityPermAccessControl>
              ]}
            >
              <div style={{ flexGrow: 1 }}>
                {getFields(item).map(p => (
                  <EntityProperty
                    entityName={ENTITY_NAME}
                    propertyName={p}
                    value={item[p]}
                    key={p}
                  />
                ))}
              </div>
            </List.Item>
          )}
        />

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

registerScreen({
  component: IntIdentityIdBrowserList,
  caption: "intIdentityIdBrowserList",
  screenId: "IntIdentityIdBrowserList",
  crudOptions: {
    entityName: ENTITY_NAME,
    isEntityList: true
  },
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default IntIdentityIdBrowserList;

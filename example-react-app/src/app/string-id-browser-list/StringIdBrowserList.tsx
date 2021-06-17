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
  registerEntityList
} from "@haulmont/jmix-react-ui";
import { StringIdTestEntity } from "../../jmix/entities/scr_StringIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdBrowserList";

const SCR_STRINGIDTESTENTITY_LIST = gql`
  query scr_StringIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_StringIdTestEntityOrderBy
    $filter: [inp_scr_StringIdTestEntityFilterCondition]
  ) {
    scr_StringIdTestEntityCount
    scr_StringIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      identifier
      _instanceName
      description
      productCode

      createTs
      createdBy
      updateTs
      updatedBy
      deleteTs
      deletedBy
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

const StringIdBrowserList = observer(
  (props: EntityListProps<StringIdTestEntity>) => {
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
    } = useEntityList<StringIdTestEntity>({
      listQuery: SCR_STRINGIDTESTENTITY_LIST,
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
          renderItem={(item: EntityInstance<StringIdTestEntity>) => (
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

registerEntityList({
  component: StringIdBrowserList,
  caption: "stringIdBrowserList",
  screenId: "StringIdBrowserList",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default StringIdBrowserList;

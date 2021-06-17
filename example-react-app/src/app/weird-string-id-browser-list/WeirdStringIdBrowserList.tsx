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
  EntityPermAccessControl
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
import { WeirdStringIdTestEntity } from "../../jmix/entities/scr_WeirdStringIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdBrowserList";

const SCR_WEIRDSTRINGIDTESTENTITY_LIST = gql`
  query scr_WeirdStringIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_WeirdStringIdTestEntityOrderBy
    $filter: [inp_scr_WeirdStringIdTestEntityFilterCondition]
  ) {
    scr_WeirdStringIdTestEntityCount
    scr_WeirdStringIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      identifier
      description
    }
  }
`;

const WeirdStringIdBrowserList = observer(
  (props: EntityListProps<WeirdStringIdTestEntity>) => {
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
    } = useEntityList<WeirdStringIdTestEntity>({
      listQuery: SCR_WEIRDSTRINGIDTESTENTITY_LIST,
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
          renderItem={(item: EntityInstance<WeirdStringIdTestEntity>) => (
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
  component: WeirdStringIdBrowserList,
  caption: "weirdStringIdBrowserList",
  screenId: "WeirdStringIdBrowserList",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default WeirdStringIdBrowserList;

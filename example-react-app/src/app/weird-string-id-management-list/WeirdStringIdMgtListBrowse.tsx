import React, { useContext } from "react";
import { observer } from "mobx-react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, List } from "antd";
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
  EntityListProps
} from "@haulmont/jmix-react-ui";
import { WeirdStringIdTestEntity } from "../../jmix/entities/scr_WeirdStringIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdMgtListManagement";

const SCR_WEIRDSTRINGIDTESTENTITY_LIST = gql`
  query scr_WeirdStringIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_WeirdStringIdTestEntityOrderBy
    $filter: [inp_scr_WeirdStringIdTestEntityFilterCondition]
    $loadItems: Boolean!
  ) {
    scr_WeirdStringIdTestEntityCount
    scr_WeirdStringIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) @include(if: $loadItems) {
      id
      _instanceName
      identifier
      description
    }
  }
`;

const DELETE_SCR_WEIRDSTRINGIDTESTENTITY = gql`
  mutation Delete_scr_WeirdStringIdTestEntity($id: String!) {
    delete_scr_WeirdStringIdTestEntity(id: $id)
  }
`;

const WeirdStringIdMgtListBrowse = observer(
  (props: EntityListProps<WeirdStringIdTestEntity>) => {
    const { entityList, onEntityListChange } = props;
    const screens = useContext(ScreensContext);

    const {
      items,
      count,
      executeListQuery,
      listQueryResult: { loading, error },
      showDeletionDialog,
      handleCreateBtnClick,
      handleEditBtnClick,
      handlePaginationChange,
      store
    } = useEntityList<WeirdStringIdTestEntity>({
      listQuery: SCR_WEIRDSTRINGIDTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_WEIRDSTRINGIDTESTENTITY,
      screens,
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
                    onClick={showDeletionDialog.bind(null, item)}
                  />
                </EntityPermAccessControl>,
                <EntityPermAccessControl
                  entityName={ENTITY_NAME}
                  operation="update"
                >
                  <EditOutlined
                    key="edit"
                    onClick={handleEditBtnClick.bind(null, item.id)}
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
            paginationConfig={store.pagination ?? {}}
            onPagingChange={handlePaginationChange}
            total={count}
          />
        </div>
      </div>
    );
  }
);

export default WeirdStringIdMgtListBrowse;

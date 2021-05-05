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
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";
import { TrickyIdTestEntity } from "../../jmix/entities/scr_TrickyIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_TrickyIdTestEntity";
const ROUTING_PATH = "/trickyIdMgr";

const SCR_TRICKYIDTESTENTITY_LIST = gql`
  query scr_TrickyIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_TrickyIdTestEntityOrderBy
    $filter: [inp_scr_TrickyIdTestEntityFilterCondition]
  ) {
    scr_TrickyIdTestEntityCount
    scr_TrickyIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      otherAttr
    }
  }
`;

const DELETE_SCR_TRICKYIDTESTENTITY = gql`
  mutation Delete_scr_TrickyIdTestEntity($id: String!) {
    delete_scr_TrickyIdTestEntity(id: $id)
  }
`;

const TrickyIdList = observer(() => {
  const screens = useContext(ScreensContext);

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    showDeletionDialog,
    handleCreateBtnClick,
    handleEditBtnClick,
    handlePaginationChange,
    store
  } = useEntityList<TrickyIdTestEntity>({
    listQuery: SCR_TRICKYIDTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_TRICKYIDTESTENTITY,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data?.scr_TrickyIdTestEntityList ?? [];
  const pagesTotal = data?.scr_TrickyIdTestEntityCount ?? 0;

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
        dataSource={dataSource}
        renderItem={(item: EntityInstance<TrickyIdTestEntity>) => (
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
          total={pagesTotal}
        />
      </div>
    </div>
  );
});

export default TrickyIdList;

import React, { useContext } from "react";
import { observer } from "mobx-react";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
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
  EntityListProps
} from "@haulmont/jmix-react-ui";
import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdMgtCardsManagement";

const SCR_INTIDENTITYIDTESTENTITY_LIST = gql`
  query scr_IntIdentityIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_IntIdentityIdTestEntityOrderBy
    $filter: [inp_scr_IntIdentityIdTestEntityFilterCondition]
    $loadItems: Boolean!
  ) {
    scr_IntIdentityIdTestEntityCount
    scr_IntIdentityIdTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) @include(if: $loadItems) {
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

const IntIdentityIdMgtCardsBrowse = observer(
  (props: EntityListProps<IntIdentityIdTestEntity>) => {
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
    } = useEntityList<IntIdentityIdTestEntity>({
      listQuery: SCR_INTIDENTITYIDTESTENTITY_LIST,
      deleteMutation: DELETE_SCR_INTIDENTITYIDTESTENTITY,
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
                <DeleteOutlined
                  key="delete"
                  onClick={showDeletionDialog.bind(null, e)}
                />
              </EntityPermAccessControl>,
              <EntityPermAccessControl
                entityName={ENTITY_NAME}
                operation="update"
              >
                <EditOutlined
                  key="edit"
                  onClick={handleEditBtnClick.bind(null, e.id)}
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
            paginationConfig={store.pagination ?? {}}
            onPagingChange={handlePaginationChange}
            total={count}
          />
        </div>
      </div>
    );
  }
);

export default IntIdentityIdMgtCardsBrowse;

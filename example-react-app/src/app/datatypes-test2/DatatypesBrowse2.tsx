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
  GenericEntityListProps
} from "@haulmont/jmix-react-ui";
import { DatatypesTestEntity } from "../../jmix/entities/scr_DatatypesTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_DatatypesTestEntity";
const ROUTING_PATH = "/datatypesManagement2";

const SCR_DATATYPESTESTENTITY_LIST = gql`
  query scr_DatatypesTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_DatatypesTestEntityOrderBy
    $filter: [inp_scr_DatatypesTestEntityFilterCondition]
  ) {
    scr_DatatypesTestEntityCount
    scr_DatatypesTestEntityList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      bigDecimalAttr
      booleanAttr
      dateAttr
      dateTimeAttr
      doubleAttr
      integerAttr
      longAttr
      stringAttr
      timeAttr
      uuidAttr
      localDateTimeAttr
      offsetDateTimeAttr
      localDateAttr
      localTimeAttr
      offsetTimeAttr
      enumAttr
      associationO2Oattr {
        id
        _instanceName
      }
      associationO2Mattr {
        id
        _instanceName
      }
      associationM2Oattr {
        id
        _instanceName
      }
      associationM2Mattr {
        id
        _instanceName
      }
      compositionO2Oattr {
        id
        _instanceName
        name
        quantity
      }
      intIdentityIdTestEntityAssociationO2OAttr {
        id
        _instanceName
      }
      integerIdTestEntityAssociationM2MAttr {
        id
        _instanceName
      }
      datatypesTestEntity3 {
        id
        _instanceName
      }
      name
    }
  }
`;

const DELETE_SCR_DATATYPESTESTENTITY = gql`
  mutation Delete_scr_DatatypesTestEntity($id: String!) {
    delete_scr_DatatypesTestEntity(id: $id)
  }
`;

const DatatypesBrowse2 = observer((props: GenericEntityListProps) => {
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
  } = useEntityList<DatatypesTestEntity>({
    listQuery: SCR_DATATYPESTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_DATATYPESTESTENTITY,
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
        renderItem={(item: EntityInstance<DatatypesTestEntity>) => (
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
});

export default DatatypesBrowse2;

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
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";
import { StringIdTestEntity } from "../../jmix/entities/scr_StringIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdMgtCardsManagement";

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
      id
      _instanceName
      identifier
      description
      productCode
    }
  }
`;

const DELETE_SCR_STRINGIDTESTENTITY = gql`
  mutation Delete_scr_StringIdTestEntity($id: String!) {
    delete_scr_StringIdTestEntity(id: $id)
  }
`;

const StringIdMgtCardsBrowse = observer(() => {
  const screens = useContext(ScreensContext);

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    showDeletionDialog,
    handleCreateBtnClick,
    handleEditBtnClick,
    handlePaginationChange,
    store
  } = useEntityList<StringIdTestEntity>({
    listQuery: SCR_STRINGIDTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_STRINGIDTESTENTITY,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    queryName: "scr_StringIdTestEntityList"
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data?.scr_StringIdTestEntityList ?? [];
  const pagesTotal = data?.scr_StringIdTestEntityCount ?? 0;

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

      {dataSource == null || dataSource.length === 0 ? (
        <p>
          <FormattedMessage id="management.browser.noItems" />
        </p>
      ) : null}
      {dataSource.map((e: EntityInstance<StringIdTestEntity>) => (
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
          total={pagesTotal}
        />
      </div>
    </div>
  );
});

export default StringIdMgtCardsBrowse;

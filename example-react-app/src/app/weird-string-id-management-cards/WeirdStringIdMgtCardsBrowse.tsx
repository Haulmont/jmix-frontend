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
  useEntityList
} from "@haulmont/jmix-react-ui";
import { WeirdStringIdTestEntity } from "../../jmix/entities/scr_WeirdStringIdTestEntity";
import { FormattedMessage } from "react-intl";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_WeirdStringIdTestEntity";
const ROUTING_PATH = "/weirdStringIdMgtCardsManagement";

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

const DELETE_SCR_WEIRDSTRINGIDTESTENTITY = gql`
  mutation Delete_scr_WeirdStringIdTestEntity($id: String!) {
    delete_scr_WeirdStringIdTestEntity(id: $id)
  }
`;

const WeirdStringIdMgtCardsBrowse = observer(() => {
  const screens = useContext(ScreensContext);

  const {
    loadItems,
    listQueryResult: { loading, error, data },
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
    routingPath: ROUTING_PATH
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data?.scr_WeirdStringIdTestEntityList ?? [];
  const pagesTotal = data?.scr_WeirdStringIdTestEntityCount ?? 0;

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
      {dataSource.map((e: EntityInstance<WeirdStringIdTestEntity>) => (
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

export default WeirdStringIdMgtCardsBrowse;

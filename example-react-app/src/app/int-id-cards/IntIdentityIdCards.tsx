import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { IntIdentityIdTestEntity } from "../../jmix/entities/scr_IntIdentityIdTestEntity";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  RetryDialog,
  Spinner,
  useEntityList,
  registerRoute
} from "@haulmont/jmix-react-ui";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_IntIdentityIdTestEntity";
const ROUTING_PATH = "/intIdentityIdCards";

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

export const IntIdentityIdCards = observer(() => {
  const screens = useContext(ScreensContext);

  const {
    loadItems,
    listQueryResult: { loading, error, data },
    handlePaginationChange,
    store
  } = useEntityList<IntIdentityIdTestEntity>({
    listQuery: SCR_INTIDENTITYIDTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_INTIDENTITYIDTESTENTITY,
    screens,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    queryName: "scr_IntIdentityIdTestEntityList"
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={loadItems} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data?.scr_IntIdentityIdTestEntityList ?? [];
  const pagesTotal = data?.scr_IntIdentityIdTestEntityCount ?? 0;

  return (
    <div className="narrow-layout">
      {dataSource.map(e => (
        <Card
          title={e._instanceName}
          key={e.id ? getStringId(e.id) : undefined}
          style={{ marginBottom: "12px" }}
        >
          {getFields(e).map(p => (
            <EntityProperty
              entityName={IntIdentityIdTestEntity.NAME}
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

registerRoute(
  ROUTING_PATH,
  ROUTING_PATH,
  "IntIdentityIdCards",
  <IntIdentityIdCards />,
  ENTITY_NAME,
  "IntIdentityIdCards"
);

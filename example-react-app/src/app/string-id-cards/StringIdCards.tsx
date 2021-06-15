import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { StringIdTestEntity } from "../../jmix/entities/scr_StringIdTestEntity";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  Paging,
  RetryDialog,
  Spinner,
  useEntityList,
  registerScreen
} from "@haulmont/jmix-react-ui";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdCards";

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

const DELETE_SCR_STRINGIDTESTENTITY = gql`
  mutation Delete_scr_StringIdTestEntity($id: String!) {
    delete_scr_StringIdTestEntity(id: $id)
  }
`;

export const StringIdCards = observer(() => {
  const {
    executeListQuery,
    listQueryResult: { loading, error, data },
    handlePaginationChange,
    entityListState
  } = useEntityList<StringIdTestEntity>({
    listQuery: SCR_STRINGIDTESTENTITY_LIST,
    deleteMutation: DELETE_SCR_STRINGIDTESTENTITY,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || data == null) {
    return <Spinner />;
  }

  const dataSource = data?.scr_StringIdTestEntityList ?? [];
  const pagesTotal = data?.scr_StringIdTestEntityCount ?? 0;

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
              entityName={StringIdTestEntity.NAME}
              propertyName={p}
              value={e[p]}
              key={p}
            />
          ))}
        </Card>
      ))}

      <div style={{ margin: "12px 0 12px 0", float: "right" }}>
        <Paging
          paginationConfig={entityListState.pagination ?? {}}
          onPagingChange={handlePaginationChange}
          total={pagesTotal}
        />
      </div>
    </div>
  );
});

registerScreen({
  component: StringIdCards,
  caption: "stringIdCards",
  screenId: "StringIdCards",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

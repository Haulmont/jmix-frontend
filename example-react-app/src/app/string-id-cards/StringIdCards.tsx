import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { StringIdTestEntity } from "../../jmix/entities/scr_StringIdTestEntity";
import { getFields, ScreensContext } from "@haulmont/jmix-react-core";
import {
  EntityProperty,
  useEntityList,
  registerScreen
} from "@haulmont/jmix-react-web";
import {
  Paging,
  Spinner,
  RetryDialog,
  saveHistory
} from "@haulmont/jmix-react-antd";
import { getStringId } from "@haulmont/jmix-rest";
import { gql } from "@apollo/client";
import styles from "../../app/App.module.css";

const ENTITY_NAME = "scr_StringIdTestEntity";
const ROUTING_PATH = "/stringIdCards";

const SCR_STRINGIDTESTENTITY_LIST = gql`
  query scr_StringIdTestEntityList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_StringIdTestEntityOrderBy
    $filter: [inp_scr_StringIdTestEntityFilterCondition]
  ) {
    scr_StringIdTestEntityCount(filter: $filter)
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

export const StringIdCards = observer(() => {
  const {
    items,
    count,
    executeListQuery,
    listQueryResult: { loading, error },
    handlePaginationChange,
    entityListState
  } = useEntityList<StringIdTestEntity>({
    listQuery: SCR_STRINGIDTESTENTITY_LIST,
    entityName: ENTITY_NAME,
    routingPath: ROUTING_PATH,
    onPagination: saveHistory
  });

  if (error != null) {
    console.error(error);
    return <RetryDialog onRetry={executeListQuery} />;
  }

  if (loading || items == null) {
    return <Spinner />;
  }

  return (
    <div className={styles.narrowLayout}>
      {items.map(item => (
        <Card
          title={item._instanceName}
          key={item.id ? getStringId(item.id) : undefined}
          style={{ marginBottom: "12px" }}
        >
          {getFields(item).map(fieldName => (
            <EntityProperty
              entityName={StringIdTestEntity.NAME}
              propertyName={fieldName}
              value={item[fieldName]}
              key={fieldName}
            />
          ))}
        </Card>
      ))}

      <div style={{ margin: "12px 0 12px 0", float: "right" }}>
        <Paging
          paginationConfig={entityListState.pagination ?? {}}
          onPagingChange={handlePaginationChange}
          total={count}
        />
      </div>
    </div>
  );
});

registerScreen({
  component: StringIdCards,
  caption: "screen.StringIdCards",
  screenId: "StringIdCards",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

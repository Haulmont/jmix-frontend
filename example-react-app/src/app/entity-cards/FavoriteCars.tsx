import React from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { FavoriteCar } from "../../jmix/entities/scr_FavoriteCar";
import { getFields } from "@haulmont/jmix-react-core";
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

const ENTITY_NAME = "scr_FavoriteCar";
const ROUTING_PATH = "/favoriteCars";

const SCR_FAVORITECAR_LIST = gql`
  query scr_FavoriteCarList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_FavoriteCarOrderBy
    $filter: [inp_scr_FavoriteCarFilterCondition]
  ) {
    scr_FavoriteCarCount(filter: $filter)
    scr_FavoriteCarList(
      limit: $limit
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      id
      _instanceName
      notes

      user {
        id
        _instanceName
      }
      car {
        id
        _instanceName
      }
    }
  }
`;

const FavoriteCars = observer(() => {
  const {
    items,
    count,
    executeListQuery,
    listQueryResult: { loading, error },
    handlePaginationChange,
    entityListState
  } = useEntityList<FavoriteCar>({
    listQuery: SCR_FAVORITECAR_LIST,
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
              entityName={FavoriteCar.NAME}
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
  component: FavoriteCars,
  caption: "screen.FavoriteCars",
  screenId: "FavoriteCars",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

export default FavoriteCars;

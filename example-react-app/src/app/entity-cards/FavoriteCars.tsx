import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { FavoriteCar } from "../../jmix/entities/scr_FavoriteCar";
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

export const FavoriteCars = observer(() => {
  const {
    executeListQuery,
    listQueryResult: { loading, error, data },
    handlePaginationChange,
    entityListState
  } = useEntityList<FavoriteCar>({
    listQuery: SCR_FAVORITECAR_LIST,
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

  const dataSource = data?.scr_FavoriteCarList ?? [];
  const pagesTotal = data?.scr_FavoriteCarCount ?? 0;

  return (
    <div className={styles.narrowLayout}>
      {dataSource.map(e => (
        <Card
          title={e._instanceName}
          key={e.id ? getStringId(e.id) : undefined}
          style={{ marginBottom: "12px" }}
        >
          {getFields(e).map(p => (
            <EntityProperty
              entityName={FavoriteCar.NAME}
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
  component: FavoriteCars,
  caption: "screen.FavoriteCars",
  screenId: "FavoriteCars",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

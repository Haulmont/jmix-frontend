import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Card } from "antd";
import { FavoriteCar } from "../../jmix/entities/scr$FavoriteCar";
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

const ENTITY_NAME = "scr$FavoriteCar";
const ROUTING_PATH = "/favoriteCars";

const SCR_FAVORITECAR_LIST = gql`
  query scr_FavoriteCarList(
    $limit: Int
    $offset: Int
    $orderBy: inp_scr_FavoriteCarOrderBy
    $filter: [inp_scr_FavoriteCarFilterCondition]
  ) {
    scr_FavoriteCarCount
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

const DELETE_SCR_FAVORITECAR = gql`
  mutation Delete_scr_FavoriteCar($id: String!) {
    delete_scr_FavoriteCar(id: $id)
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
    deleteMutation: DELETE_SCR_FAVORITECAR,
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
    <div className="narrow-layout">
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

registerRoute(
  ROUTING_PATH,
  ROUTING_PATH,
  "FavoriteCars",
  <FavoriteCars />,
  ENTITY_NAME,
  "FavoriteCars"
);

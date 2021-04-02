import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import GraphQLEdit from "./GraphQLEdit";
import GraphQLList from "./GraphQLList";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = RouteComponentProps<{ entityId?: string }>;

type GraphQLManagementLocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/graphQLManagement";
export const NEW_SUBPATH = "new";

export const GraphQLManagement = (props: Props) => {
  const { entityId } = props.match.params;

  const store: GraphQLManagementLocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location.search)
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history.push(
        addPagingParams("graphQLManagement", current, pageSize)
      );
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <GraphQLEdit entityId={entityId} />
    ) : (
      <GraphQLList
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

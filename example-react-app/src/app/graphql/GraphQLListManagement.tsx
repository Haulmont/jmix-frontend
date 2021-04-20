import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import GraphQLListEdit from "./GraphQLListEdit";
import GraphQLListBrowser from "./GraphQLListBrowser";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type GraphQLListManagementLocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/graphQLListManagement";
export const NEW_SUBPATH = "new";

export const GraphQLListManagement = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: GraphQLListManagementLocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(
        addPagingParams("graphQLListManagement", current, pageSize)
      );
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <GraphQLListEdit entityId={entityId} />
    ) : (
      <GraphQLListBrowser
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

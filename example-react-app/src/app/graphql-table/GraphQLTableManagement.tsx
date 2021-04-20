import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import GraphQLTableEdit from "./GraphQLTableEdit";
import GraphQLTableBrowser from "./GraphQLTableBrowser";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type GraphQLTableManagementLocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/graphQLTableManagement";
export const NEW_SUBPATH = "new";

export const GraphQLTableManagement = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: GraphQLTableManagementLocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(
        addPagingParams("graphQLTableManagement", current, pageSize)
      );
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <GraphQLTableEdit entityId={entityId} />
    ) : (
      <GraphQLTableBrowser
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

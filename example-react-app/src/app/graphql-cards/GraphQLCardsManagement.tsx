import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import GraphQLCardsEdit from "./GraphQLCardsEdit";
import GraphQLCardsBrowser from "./GraphQLCardsBrowser";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type GraphQLCardsManagementLocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/graphQLCardsManagement";
export const NEW_SUBPATH = "new";

export const GraphQLCardsManagement = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: GraphQLCardsManagementLocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(
        addPagingParams("graphQLCardsManagement", current, pageSize)
      );
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <GraphQLCardsEdit entityId={entityId} />
    ) : (
      <GraphQLCardsBrowser
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

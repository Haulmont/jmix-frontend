import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import CarEdit from "./CarEdit";
import CarCards from "./CarCards";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type CarManagementLocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/carManagement";
export const NEW_SUBPATH = "new";

export const CarManagement = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: CarManagementLocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(addPagingParams("carManagement", current, pageSize));
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <CarEdit entityId={entityId} />
    ) : (
      <CarCards
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

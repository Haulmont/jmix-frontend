import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import CarEdit3 from "./CarEdit3";
import CarTable from "./CarTable";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type CarManagement3LocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/carManagement3";
export const NEW_SUBPATH = "new";

export const CarManagement3 = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: CarManagement3LocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(addPagingParams("carManagement3", current, pageSize));
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <CarEdit3 entityId={entityId} />
    ) : (
      <CarTable
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import CarEdit2 from "./CarEdit2";
import CarList from "./CarList";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type CarManagement2LocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/carManagement2";
export const NEW_SUBPATH = "new";

export const CarManagement2 = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: CarManagement2LocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(addPagingParams("carManagement2", current, pageSize));
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <CarEdit2 entityId={entityId} />
    ) : (
      <CarList
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

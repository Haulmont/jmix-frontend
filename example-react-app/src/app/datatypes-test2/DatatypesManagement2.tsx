import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import DatatypesEdit2 from "./DatatypesEdit2";
import DatatypesBrowse2 from "./DatatypesBrowse2";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type DatatypesManagement2LocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/datatypesManagement2";
export const NEW_SUBPATH = "new";

export const DatatypesManagement2 = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: DatatypesManagement2LocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(
        addPagingParams("datatypesManagement2", current, pageSize)
      );
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <DatatypesEdit2 entityId={entityId} />
    ) : (
      <DatatypesBrowse2
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

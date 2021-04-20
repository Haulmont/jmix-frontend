import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import DatatypesEdit1 from "./DatatypesEdit1";
import DatatypesBrowse1 from "./DatatypesBrowse1";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type DatatypesManagement1LocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/datatypesManagement1";
export const NEW_SUBPATH = "new";

export const DatatypesManagement1 = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: DatatypesManagement1LocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(
        addPagingParams("datatypesManagement1", current, pageSize)
      );
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <DatatypesEdit1 entityId={entityId} />
    ) : (
      <DatatypesBrowse1
        onPagingChange={onPagingChange}
        paginationConfig={store.paginationConfig}
      />
    );
  });
};

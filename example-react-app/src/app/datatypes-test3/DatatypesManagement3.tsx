import React, { useCallback } from "react";
import { RouteComponentProps } from "react-router";
import { useLocalStore, useObserver } from "mobx-react";
import DatatypesEdit3 from "./DatatypesEdit3";
import DatatypesBrowse3 from "./DatatypesBrowse3";
import { action } from "mobx";
import { PaginationConfig } from "antd/es/pagination";
import { addPagingParams, createPagingConfig } from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

type DatatypesManagement3LocalStore = {
  paginationConfig: PaginationConfig;
};

export const PATH = "/datatypesManagement3";
export const NEW_SUBPATH = "new";

export const DatatypesManagement3 = (props: Props) => {
  const { entityId } = props.match?.params ?? {};

  const store: DatatypesManagement3LocalStore = useLocalStore(() => ({
    paginationConfig: createPagingConfig(props.location?.search ?? "")
  }));

  const onPagingChange = useCallback(
    action((current: number, pageSize: number) => {
      props.history?.push(
        addPagingParams("datatypesManagement3", current, pageSize)
      );
      store.paginationConfig = { ...store.paginationConfig, current, pageSize };
    }),
    []
  );

  return useObserver(() => {
    return entityId != null ? (
      <DatatypesEdit3 entityId={entityId} />
    ) : (
      <DatatypesBrowse3 />
    );
  });
};

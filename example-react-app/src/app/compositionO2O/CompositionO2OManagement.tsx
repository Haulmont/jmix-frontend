import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import CompositionO2OEdit from "./CompositionO2OEdit";
import CompositionO2OBrowse from "./CompositionO2OBrowse";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable, makeObservable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

class CompositionO2OManagementComponent extends React.Component<Props> {
  static PATH = "/compositionO2OManagement";
  static NEW_SUBPATH = "new";

  paginationConfig: PaginationConfig = { ...defaultPagingConfig };

  constructor(props: Props) {
    super(props);

    makeObservable(this, {
      paginationConfig: observable,
      onPagingChange: action
    });
  }

  componentDidMount(): void {
    // to disable paging config pass 'true' as disabled param in function below
    this.paginationConfig = createPagingConfig(
      this.props?.location?.search ?? ""
    );
  }

  render() {
    const entityId = this.props?.match?.params?.entityId;
    return entityId ? (
      <CompositionO2OEdit entityId={entityId} />
    ) : (
      <CompositionO2OBrowse />
    );
  }

  onPagingChange = (current: number, pageSize: number) => {
    this.props?.history?.push(
      addPagingParams("compositionO2OManagement", current, pageSize)
    );
    this.paginationConfig = { ...this.paginationConfig, current, pageSize };
  };
}

export const CompositionO2OManagement = observer(
  CompositionO2OManagementComponent
);

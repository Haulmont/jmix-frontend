import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import AssociationO2OEdit from "./AssociationO2OEdit";
import AssociationO2OBrowse from "./AssociationO2OBrowse";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable, makeObservable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

class AssociationO2OManagementComponent extends React.Component<Props> {
  static PATH = "/associationO2OManagement";
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
      <AssociationO2OEdit entityId={entityId} />
    ) : (
      <AssociationO2OBrowse />
    );
  }

  onPagingChange = (current: number, pageSize: number) => {
    this.props?.history?.push(
      addPagingParams("associationO2OManagement", current, pageSize)
    );
    this.paginationConfig = { ...this.paginationConfig, current, pageSize };
  };
}

export const AssociationO2OManagement = observer(
  AssociationO2OManagementComponent
);

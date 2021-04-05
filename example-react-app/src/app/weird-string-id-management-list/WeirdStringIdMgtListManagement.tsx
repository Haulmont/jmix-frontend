import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import WeirdStringIdMgtListEdit from "./WeirdStringIdMgtListEdit";
import WeirdStringIdMgtListBrowse from "./WeirdStringIdMgtListBrowse";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable, makeObservable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

class WeirdStringIdMgtListManagementComponent extends React.Component<Props> {
  static PATH = "/weirdStringIdMgtListManagement";
  static NEW_SUBPATH = "new";

  paginationConfig: PaginationConfig = { ...defaultPagingConfig };

  constructor(props: Props) {
    super(props);

    makeObservable(this, {
      paginationConfig: observable,
      setPaginationConfig: action.bound
    });
  }

  setPaginationConfig(paginationConfig: PaginationConfig) {
    this.paginationConfig = paginationConfig;
  }

  onPagingChange = (current: number, pageSize: number) => {
    this.props?.history?.push(
      addPagingParams("weirdStringIdMgtListManagement", current, pageSize)
    );
    this.setPaginationConfig({ ...this.paginationConfig, current, pageSize });
  };

  componentDidMount(): void {
    // to disable paging config pass 'true' as disabled param in function below
    this.setPaginationConfig(
      createPagingConfig(this.props?.location?.search ?? "")
    );
  }

  render() {
    const entityId = this.props?.match?.params?.entityId;
    return entityId ? (
      <WeirdStringIdMgtListEdit entityId={entityId} />
    ) : (
      <WeirdStringIdMgtListBrowse
        onPagingChange={this.onPagingChange}
        paginationConfig={this.paginationConfig}
      />
    );
  }
}

export const WeirdStringIdMgtListManagement = observer(
  WeirdStringIdMgtListManagementComponent
);

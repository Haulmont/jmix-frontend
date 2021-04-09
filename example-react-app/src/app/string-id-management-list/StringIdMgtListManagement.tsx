import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import StringIdMgtListEdit from "./StringIdMgtListEdit";
import StringIdMgtListBrowse from "./StringIdMgtListBrowse";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable, makeObservable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

class StringIdMgtListManagementComponent extends React.Component<Props> {
  static PATH = "/stringIdMgtListManagement";
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
      <StringIdMgtListEdit entityId={entityId} />
    ) : (
      <StringIdMgtListBrowse
        onPagingChange={this.onPagingChange}
        paginationConfig={this.paginationConfig}
      />
    );
  }

  onPagingChange = (current: number, pageSize: number) => {
    this.props?.history?.push(
      addPagingParams("stringIdMgtListManagement", current, pageSize)
    );
    this.paginationConfig = { ...this.paginationConfig, current, pageSize };
  };
}

export const StringIdMgtListManagement = observer(
  StringIdMgtListManagementComponent
);

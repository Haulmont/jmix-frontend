import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import HasEmbeddedTestEdit from "./HasEmbeddedTestEdit";
import HasEmbeddedTestTable from "./HasEmbeddedTestTable";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class HasEmbeddedTestManagement extends React.Component<Props> {
  static PATH = "/hasEmbeddedTestManagement";
  static NEW_SUBPATH = "new";

  @observable paginationConfig: PaginationConfig = { ...defaultPagingConfig };

  componentDidMount(): void {
    // to disable paging config pass 'true' as disabled param in function below
    this.paginationConfig = createPagingConfig(this.props.location.search);
  }

  render() {
    const { entityId } = this.props.match.params;
    return entityId ? (
      <HasEmbeddedTestEdit entityId={entityId} />
    ) : (
      <HasEmbeddedTestTable />
    );
  }

  @action onPagingChange = (current: number, pageSize: number) => {
    this.props.history.push(
      addPagingParams("hasEmbeddedTestManagement", current, pageSize)
    );
    this.paginationConfig = { ...this.paginationConfig, current, pageSize };
  };
}

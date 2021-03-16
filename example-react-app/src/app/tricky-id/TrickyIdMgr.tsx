import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import TrickyIdEdit from "./TrickyIdEdit";
import TrickyIdList from "./TrickyIdList";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class TrickyIdMgr extends React.Component<Props> {
  static PATH = "/trickyIdMgr";
  static NEW_SUBPATH = "new";

  @observable paginationConfig: PaginationConfig = { ...defaultPagingConfig };

  componentDidMount(): void {
    // to disable paging config pass 'true' as disabled param in function below
    this.paginationConfig = createPagingConfig(this.props.location.search);
  }

  render() {
    const { entityId } = this.props.match.params;
    return entityId ? (
      <TrickyIdEdit entityId={entityId} />
    ) : (
      <TrickyIdList
        onPagingChange={this.onPagingChange}
        paginationConfig={this.paginationConfig}
      />
    );
  }

  @action onPagingChange = (current: number, pageSize: number) => {
    this.props.history.push(addPagingParams("trickyIdMgr", current, pageSize));
    this.paginationConfig = { ...this.paginationConfig, current, pageSize };
  };
}

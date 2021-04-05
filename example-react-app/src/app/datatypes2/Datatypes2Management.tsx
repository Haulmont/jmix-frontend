import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import Datatypes2Edit from "./Datatypes2Edit";
import Datatypes2Browse from "./Datatypes2Browse";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable, makeObservable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

class Datatypes2ManagementComponent extends React.Component<Props> {
  static PATH = "/datatypes2Management";
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
      addPagingParams("datatypes2Management", current, pageSize)
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
      <Datatypes2Edit entityId={entityId} />
    ) : (
      <Datatypes2Browse />
    );
  }
}

export const Datatypes2Management = observer(Datatypes2ManagementComponent);

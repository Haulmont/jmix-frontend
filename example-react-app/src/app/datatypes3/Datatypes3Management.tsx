import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import Datatypes3Edit from "./Datatypes3Edit";
import Datatypes3Browse from "./Datatypes3Browse";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable, makeObservable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

class Datatypes3ManagementComponent extends React.Component<Props> {
  static PATH = "/datatypes3Management";
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
      <Datatypes3Edit entityId={entityId} />
    ) : (
      <Datatypes3Browse />
    );
  }

  onPagingChange = (current: number, pageSize: number) => {
    this.props?.history?.push(
      addPagingParams("datatypes3Management", current, pageSize)
    );
    this.paginationConfig = { ...this.paginationConfig, current, pageSize };
  };
}

export const Datatypes3Management = observer(Datatypes3ManagementComponent);

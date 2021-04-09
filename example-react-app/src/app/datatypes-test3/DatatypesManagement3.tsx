import * as React from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
import DatatypesEdit3 from "./DatatypesEdit3";
import DatatypesBrowse3 from "./DatatypesBrowse3";
import { PaginationConfig } from "antd/es/pagination";
import { action, observable, makeObservable } from "mobx";
import {
  addPagingParams,
  createPagingConfig,
  defaultPagingConfig
} from "@haulmont/jmix-react-ui";

type Props = Partial<RouteComponentProps<{ entityId?: string }>>;

class DatatypesManagement3Component extends React.Component<Props> {
  static PATH = "/datatypesManagement3";
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
      <DatatypesEdit3 entityId={entityId} />
    ) : (
      <DatatypesBrowse3 />
    );
  }

  onPagingChange = (current: number, pageSize: number) => {
    this.props?.history?.push(
      addPagingParams("datatypesManagement3", current, pageSize)
    );
    this.paginationConfig = { ...this.paginationConfig, current, pageSize };
  };
}

export const DatatypesManagement3 = observer(DatatypesManagement3Component);

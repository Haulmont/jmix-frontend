import {PaginationConfig} from "antd/es/pagination";
import React from "react";
import {Pagination} from "antd";
import {toJS} from "mobx";

type Props = {
  paginationConfig: PaginationConfig;
  total?: number,
  onPagingChange: (current: number, pageSize?: number) => void;
}

export class Paging extends React.Component<Props> {
  render() {
    const {paginationConfig, total} = this.props;

    return (
      <Pagination
        {...paginationConfig}
        total={total}
        pageSizeOptions={toJS(paginationConfig.pageSizeOptions)}
        onChange={this.props.onPagingChange}
        onShowSizeChange={this.props.onPagingChange}
      />
    );
  }
}

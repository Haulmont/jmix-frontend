import React from "react";
import {Table as AntdTable} from "antd";
import {TableProps as AntdTableProps} from 'antd/es/table';

type TableProps<ExtTableProps> = ExtTableProps & {
  tableComponent?: (props: ExtTableProps) => JSX.Element,
}

export const Table = function <ExtTableProps = AntdTableProps<any>>({
  tableComponent = (props: TableProps<ExtTableProps>) => {
    return (
      <AntdTable 
        {...props as TableProps<AntdTableProps<any>>}
      />
    );
  },
  ...tableProps
}: TableProps<ExtTableProps>) {
    return tableComponent({...tableProps} as ExtTableProps);
}

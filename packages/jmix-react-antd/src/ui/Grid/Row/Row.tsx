import React from 'react';
import { Row as AntdRow, RowProps as AntdRowProps } from 'antd';

type RowProps = AntdRowProps;

function Row(props: RowProps) {
  return (
    <AntdRow {...props} />
  );
}

export { Row, RowProps };
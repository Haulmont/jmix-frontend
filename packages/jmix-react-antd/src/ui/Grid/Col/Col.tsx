import React from 'react';
import { Col as AntdCol, ColProps as AntdColProps } from 'antd';

type ColProps = AntdColProps;

function Col(props: ColProps) {
  return (
    <AntdCol {...props} />
  );
}

export { Col, ColProps };
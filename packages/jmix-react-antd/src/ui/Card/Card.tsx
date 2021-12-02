import React from 'react';
import { Card as AntdCard, CardProps as AntdCardProps } from 'antd';

type CardProps = AntdCardProps;

function Card(props: CardProps) {
  return (
    <AntdCard {...props} />
  );
}

export { Card, CardProps };
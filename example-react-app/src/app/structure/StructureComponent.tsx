import { Row, Col, Card } from "antd";
import * as React from "react";

export const StructureComponent = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Card title="Column one header">Content</Card>
    </Col>

    <Col span={12}>
      <Card title="Column two header">Content</Card>
    </Col>
  </Row>
);

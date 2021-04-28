import { Row, Col, Card } from "antd";
import React from "react";

export class StructureComponent extends React.Component {
  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Column one header">Content</Card>
        </Col>

        <Col span={12}>
          <Card title="Column two header">Content</Card>
        </Col>
      </Row>
    );
  }
}

import { Row, Col, Card } from "antd";
import React from "react";
import { registerScreen } from "@haulmont/jmix-react-ui";

const ROUTING_PATH = "/structureComponent";

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

registerScreen({
  component: StructureComponent,
  caption: "screen.StructureComponent",
  screenId: "StructureComponent",
  menuOptions: {
    pathPattern: ROUTING_PATH,
    menuLink: ROUTING_PATH
  }
});

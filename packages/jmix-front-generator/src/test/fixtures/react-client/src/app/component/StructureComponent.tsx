import { Row, Col, Card } from "antd";
import React from "react";
import { registerScreen } from "@haulmont/jmix-react-web";
import styles from "app/App.module.css";

const ROUTING_PATH = "/structureComponent";

const StructureComponent = () => (
  <Row gutter={16} role="grid">
    <Col span={12}>
      <Card
        title="Column one header"
        tabIndex={0}
        role="gridcell"
        className={styles.focusInnerHighlight}
      >
        Content
      </Card>
    </Col>

    <Col span={12}>
      <Card
        title="Column two header"
        tabIndex={0}
        role="gridcell"
        className={styles.focusInnerHighlight}
      >
        Content
      </Card>
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

export default StructureComponent;

import { registerScreen, Label } from "@haulmont/jmix-react-web";
import { Card, Space, Button } from "antd";
import { EntityHierarchyTree, Tooltip, ProgressBar, Card as CustomCard, Col, Row } from "@haulmont/jmix-react-antd";
import styles from "../App.module.css";
import localStyles from './CustomDataDisplayComponents.module.css';

const ROUTING_PATH = "/customDataDisplayComponents";

const CustomDataDisplayComponents = () => {
    return (
        <div className={styles.narrowLayout}>
            <Space direction="vertical" style={{width: "100%"}}>
                <Card title="EntityHierarchyTree" size="small">
                    <EntityHierarchyTree
                        hierarchyProperty="parent"
                        items={[
                            {
                                id: "A",
                                _instanceName: "Node A",
                            }, {
                                id: "A1",
                                parent: "A",
                                _instanceName: "Node A1",
                            }, {
                                id: "A2",
                                parent: "A",
                                _instanceName: "Node A2",
                            }, {
                                id: "A21",
                                parent: "A2",
                                _instanceName: "Node A21",
                            }, {
                                id: "B",
                                _instanceName: "Node B",
                            }, {
                                id: "B1",
                                parent: "B",
                                _instanceName: "Node B1",
                            }, {
                                id: "C",
                                parent: undefined,
                                _instanceName: "Node C",
                            }]}
                    />
                </Card>
                <Card title="Label" size="small">
                    <Label
                        entityName="scr_Car"
                        propertyName="technicalCertificate"
                    />
                </Card>
                <Card title="tooltip" size="small">
                    <Tooltip title="Tooltip Title">
                        <Button type="link">Text with tooltip</Button>
                    </Tooltip>
                </Card>
                <Card title="ProgressBar">
                    <ProgressBar percent={50} />
                </Card>
                <CustomCard title="Card title"
                            className="custom-card">
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </CustomCard>
                <Card title="Grid">
                    <Row className={localStyles.rowItem}>
                        <Col span={24}>col</Col>
                    </Row>
                    <Row className={localStyles.rowItem}>
                        <Col span={12}>col-12</Col>
                        <Col span={12}>col-12</Col>
                    </Row>
                    <Row className={localStyles.rowItem}>
                        <Col span={8}>col-8</Col>
                        <Col span={8}>col-8</Col>
                        <Col span={8}>col-8</Col>
                    </Row>
                    <Row className={localStyles.rowItem}>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>col-6</Col>
                        <Col span={6}>col-6</Col>
                    </Row>
                </Card>
            </Space>
        </div>
    )
}

registerScreen({
    component: CustomDataDisplayComponents,
    caption: "screen.CustomDataDisplayComponents",
    screenId: "CustomDataDisplayComponents",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    }
});

export default CustomDataDisplayComponents
import React from "react";
import {registerScreen} from "@haulmont/jmix-react-web";
import {Card, Space} from "antd";
import styles from "../App.module.css";
import {Paging} from "@haulmont/jmix-react-antd";

const ROUTING_PATH = "/customControls";

const CustomControls = () => {
    return (
        <Space direction="vertical" style={{width: "100%"}}>
            <Card title="Paging" size="small" className={styles.narrowLayout}>
                <Paging
                    total={100}
                    paginationConfig={{
                        showTotal: total => `Total ${total} items`,
                        showSizeChanger: true,
                        showQuickJumper: true,
                    }}
                    onPagingChange={() => null}
                />
            </Card>
        </Space>
    )
};

registerScreen({
    component: CustomControls,
    caption: "screen.CustomControls",
    screenId: "CustomControls",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    }
});

export default CustomControls

import React from "react";
import {registerScreen} from "@haulmont/jmix-react-web";
import { AppLayout, Header, Sidebar, Footer, Content } from "@haulmont/jmix-react-antd";
import styles from "./CustomAppLayouts.module.css";
import appStyles from "../App.module.css"
import {Card, Space} from "antd";

const ROUTING_PATH = "/customAppLayouts";

const CustomAppLayouts = () => {
    return (
      <div className={appStyles.narrowLayout}>
        <Space direction="vertical" style={{width: "100%"}}>
          <Card title="App layouts" size="small">
              <AppLayout >
                  <Header className={styles.header}>Header</Header>
                  <AppLayout>
                      <Sidebar className={styles.sider}>Sidebar</Sidebar>
                      <Content className={styles.content}>Content</Content>
                  </AppLayout>
                  <Footer className={styles.footer}>Footer</Footer>
              </AppLayout>
          </Card>
        </Space>
      </div>
    )
};

registerScreen({
    component: CustomAppLayouts,
    caption: "screen.CustomAppLayouts",
    screenId: "CustomAppLayouts",
    menuOptions: {
        pathPattern: ROUTING_PATH,
        menuLink: ROUTING_PATH
    }
});

export default CustomAppLayouts

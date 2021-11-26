import React from "react";
import {registerScreen} from "@haulmont/jmix-react-web";
import { AppLayout, Header, Sider, Footer, Content } from "@haulmont/jmix-react-antd";
import styles from "./CustomAppLayouts.module.css";
import {Card} from "antd";

const ROUTING_PATH = "/customAppLayouts";

const CustomAppLayouts = () => {
    return (
      <Card title="App layouts" size="small">
          <AppLayout >
              <Header className={styles.header}>Header</Header>
              <AppLayout>
                  <Sider className={styles.sider}>Sider</Sider>
                  <Content className={styles.content}>Content</Content>
              </AppLayout>
              <Footer className={styles.footer}>Footer</Footer>
          </AppLayout>
      </Card>
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

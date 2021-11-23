import {registerScreen} from "@haulmont/jmix-react-web";
import styles from "../App.module.css";
import {Card} from "antd";
import { EntityHierarchyTree } from "@haulmont/jmix-react-antd";

const ROUTING_PATH = "/CustomDataDisplayComponents";

const CustomDataDisplayComponents = () => {
  return (
    <Card className={styles.narrowLayout} title="EntityHierarchyTree">
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
          }]}
      />
    </Card>
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
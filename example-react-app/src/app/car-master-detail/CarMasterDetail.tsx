import React from "react";
import CarMasterDetailEditor from "./CarMasterDetailEditor";
import CarMasterDetailBrowser from "./CarMasterDetailBrowser";
import { MasterDetailManager } from "@haulmont/jmix-react-antd";
import { registerEntityList } from "@haulmont/jmix-react-web";
import { observer } from "mobx-react";

const ENTITY_NAME = "scr_Car";
const ROUTING_PATH = "/carMasterDetail";

const CarMasterDetail = observer(() => {
  return (
    <MasterDetailManager
      editor={<CarMasterDetailEditor />}
      browser={<CarMasterDetailBrowser />}
    />
  );
});

registerEntityList({
  component: CarMasterDetail,
  caption: "screen.CarMasterDetail",
  screenId: "CarMasterDetail",
  entityName: ENTITY_NAME,
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default CarMasterDetail;

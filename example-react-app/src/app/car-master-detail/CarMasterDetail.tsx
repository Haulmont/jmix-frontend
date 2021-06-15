import React from "react";
import CarMasterDetailEditor from "./CarMasterDetailEditor";
import CarMasterDetailBrowser from "./CarMasterDetailBrowser";
import { registerScreen, MasterDetailManager } from "@haulmont/jmix-react-ui";
import { observer } from "mobx-react";

const ENTITY_NAME = "scr$Car";
const ROUTING_PATH = "/carMasterDetail";

const CarMasterDetail = observer(() => {
  return (
    <MasterDetailManager
      editor={<CarMasterDetailEditor />}
      browser={<CarMasterDetailBrowser />}
    />
  );
});

registerScreen({
  component: CarMasterDetail,
  caption: "carMasterDetail",
  screenId: "CarMasterDetail",
  crudOptions: {
    entityName: ENTITY_NAME,
    isEntityList: true
  },
  menuOptions: {
    pathPattern: `${ROUTING_PATH}/:entityId?`,
    menuLink: ROUTING_PATH
  }
});

export default CarMasterDetail;

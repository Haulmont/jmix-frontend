import React from "react";
import CarMasterDetailEditor from "./CarMasterDetailEditor";
import CarMasterDetailBrowser from "./CarMasterDetailBrowser";
import {
  registerEntityBrowserScreen,
  registerRoute,
  MasterDetailManager
} from "@haulmont/jmix-react-ui";
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

registerRoute(
  `${ROUTING_PATH}/:entityId?`,
  ROUTING_PATH,
  "carMasterDetail",
  <CarMasterDetail />,
  ENTITY_NAME,
  "CarMasterDetail"
);
registerEntityBrowserScreen(
  ENTITY_NAME,
  "carMasterDetail",
  <CarMasterDetail />
);

export default CarMasterDetail;

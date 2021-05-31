import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";
import { FormattedMessage } from "react-intl";

export const AppMenu = () => {
  return (
    <VerticalMenu>
      <MenuItem
        onClick={tabs.closeAll}
        icon={<HomeOutlined />}
        caption={<FormattedMessage id="router.home" />}
        key={"home"}
      />
      <MenuItem
        screenId={"TestBlankComponent"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.TestBlankComponent"} />}
        key={"6dcb726b-0fde-4e56-8d8f-23436ab48b49"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StructureComponent"} />}
        key={"13132697-4ab8-46b1-ae6b-683335b240f8"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserCards"} />}
        key={"0019dc9a-7106-4ffe-a307-73151a165671"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserList"} />}
        key={"d5991924-8025-4509-b31e-56eb0bcbc35f"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserTable"} />}
        key={"2294c514-8fcb-481c-84d1-3ed01f365970"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarCardsGrid"} />}
        key={"5cbf004c-294d-4812-b249-60c1f6b59e3f"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.FavoriteCars"} />}
        key={"29935120-a605-49f0-9ec1-b24d90d4c071"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserCards"} />}
        key={"16458284-4b71-4fc1-8697-d57331328eab"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserList"} />}
        key={"7abed63d-97d2-4bae-ad2f-184249db9e6f"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserTable"} />}
        key={"cd6808af-cac9-4408-b721-36d8bd75ab23"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestCards"} />}
        key={"55597e36-542e-449b-ae0a-bfc3a3b119c1"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2OBrowserTable"} />}
        key={"d10a304a-85b3-4775-a034-52e02a2988e8"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2MBrowserTable"} />}
        key={"124b09df-3e98-401b-bd64-3bdefa7677a4"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2OBrowserTable"} />}
        key={"2f225431-364f-49fd-bdf1-f34a68f5ab15"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2MBrowserTable"} />}
        key={"ef4ae05f-9f80-4b59-81eb-fa0c6ccb3285"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2OBrowserTable"} />}
        key={"7e1e95ab-572c-4925-9aae-c34ea0af7708"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2MBrowserTable"} />}
        key={"99bd6949-23e9-4d96-b14e-c900bab9735a"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserTable"} />}
        key={"b2d4acc9-2a33-405f-b0ab-01e56df3553a"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserCards"} />}
        key={"3360ca97-c51e-479d-b973-aa3d0759e9af"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserList"} />}
        key={"c96c621f-3dcd-4171-8555-550319177853"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserTable"} />}
        key={"ab525dfd-6ef9-4257-a748-41294dde64e8"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserCards"} />}
        key={"caa32a29-1dac-4b56-9c49-f6ebba04a44f"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserList"} />}
        key={"544664a9-5e28-4418-b258-e6d64e150117"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdCards"} />}
        key={"d4e0a7e2-2e8e-4dd3-8e8a-928dde3ef978"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserCards"} />}
        key={"ee1aae45-9268-4773-b417-da3e8bb22084"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserList"} />}
        key={"10371bb5-c856-4391-aad6-27939e4ff231"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserTable"} />}
        key={"3cbf45f5-754a-4ac5-a316-b229f2322920"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserCards"} />}
        key={"526fa761-97c3-4673-9f53-bf62c152c76d"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserList"} />}
        key={"09088898-6325-487b-92c0-8ad687d81664"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserTable"} />}
        key={"1b6e9833-7ffd-45ae-bc8f-47f93a93446f"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.BoringStringIdBrowserTable"} />}
        key={"5aa8a9f7-fa89-46dd-b780-5b37f075da71"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.TrickyIdBrowserTable"} />}
        key={"98d518c0-3a4e-4859-a9f1-0a6317afde6c"}
      />
    </VerticalMenu>
  );
};

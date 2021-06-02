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
        key={"612685ad-b511-4c2e-af17-3ee6003743ae"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StructureComponent"} />}
        key={"6f89fcb4-1a99-4127-8d05-7d5b17693798"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserCards"} />}
        key={"fc646fed-0e55-4d7c-86fb-81b1c17acc99"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserList"} />}
        key={"c0340397-2495-450b-85f3-06778a3ffbd1"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserTable"} />}
        key={"bf840a54-34fa-4aec-bd7e-298cd5c3bac3"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarCardsGrid"} />}
        key={"5ee34d4d-b8f5-4ef4-89bc-a5f8a4a55f13"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.FavoriteCars"} />}
        key={"8f0d9272-06ae-41b5-9b05-fd529d57e576"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserCards"} />}
        key={"5abd1ebe-d0ff-40aa-862f-97b102c99406"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserList"} />}
        key={"e0921b3c-7af9-45c9-bccd-f395de01c612"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserTable"} />}
        key={"41a2d68a-c2e4-4e61-8178-7dabee4eb5f4"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestCards"} />}
        key={"eec67c6e-5392-4835-8f65-e35eb0ba3a6c"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2OBrowserTable"} />}
        key={"bfb544b4-4b4d-4d0d-8178-f9be9661dcce"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2MBrowserTable"} />}
        key={"02cee8b9-4164-4628-8fc1-1924c9789316"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2OBrowserTable"} />}
        key={"2e452b77-73c6-423c-b14c-1d366e430c36"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2MBrowserTable"} />}
        key={"b5e5c89f-5c2b-45f1-a284-491865bf4623"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2OBrowserTable"} />}
        key={"39e1c9b2-1c76-4eaf-b17c-4a63d9e6e421"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2MBrowserTable"} />}
        key={"4b50ef0d-115d-4474-b9a8-f4f69c0ae253"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserTable"} />}
        key={"e962d373-8c7d-4347-82dd-e252b9a07e74"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserCards"} />}
        key={"11050dc7-7367-4912-8e48-cd382bcd7338"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserList"} />}
        key={"3dcf3e12-be16-4360-ae6d-2d418c54b0f7"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserTable"} />}
        key={"ebdb9707-b3d8-47b3-9e03-ccbf6e1959dc"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserCards"} />}
        key={"00792129-d506-4eb0-a8f0-5299832ef812"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserList"} />}
        key={"c1275593-f90f-4bad-b903-b96f51c05c6d"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdCards"} />}
        key={"4db56206-caa3-4f48-95bd-ff1939b94606"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserCards"} />}
        key={"0142521e-88af-4ba6-a162-6c360db38b59"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserList"} />}
        key={"267dc492-8672-449a-9ff6-9565c0ef998d"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserTable"} />}
        key={"b0ea52c7-4ce0-4170-867c-2e763d38e734"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserCards"} />}
        key={"9c9f764e-6b41-4f91-9c82-ce1a3a14eee3"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserList"} />}
        key={"ca68c26a-4731-4fc4-af99-d9196572309a"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserTable"} />}
        key={"54c8af6d-968a-476d-8745-0ca571e8c5b2"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.BoringStringIdBrowserTable"} />}
        key={"10e1a9c4-f163-4c2b-a028-0a9885467181"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.TrickyIdBrowserTable"} />}
        key={"356868b4-8d34-400e-b38a-3073c318b970"}
      />
    </VerticalMenu>
  );
};

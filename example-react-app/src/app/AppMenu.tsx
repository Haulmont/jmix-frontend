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
        key={"57923fea-3541-4650-9d69-2de9ef682f7a"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StructureComponent"} />}
        key={"c6fa1dfa-d4a6-4451-81d9-a78d05b5e1c9"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserCards"} />}
        key={"50510337-f72b-4bba-9a8b-66179dfd88cf"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserList"} />}
        key={"bc0e5b8a-7ef1-4e9f-b27e-4856b392fda7"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserTable"} />}
        key={"751d8f0f-fc36-4c5e-b036-4e01fe6fccbd"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarCardsGrid"} />}
        key={"2ec298db-06bc-415c-9391-2b43b2807499"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.FavoriteCars"} />}
        key={"8fc02104-b22d-4cbb-9011-44aec540be8e"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserCards"} />}
        key={"e69abf20-ea81-4d33-a3ab-b0a1b145dfb7"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserList"} />}
        key={"b6ce1d41-ec9d-43c8-b4f9-f7ed05802c20"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserTable"} />}
        key={"fc3a8fe0-73cb-4435-8dae-c3431cbbace9"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestCards"} />}
        key={"ad267e42-416a-4d9f-a2a1-b9c43b421dfc"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2OBrowserTable"} />}
        key={"a4eb8f30-6d4b-4685-8ee2-43da6bca16de"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2MBrowserTable"} />}
        key={"db0c53af-3708-44af-829f-1ec703b16133"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2OBrowserTable"} />}
        key={"6169e8ac-3d4c-4f40-b416-385a1530c979"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2MBrowserTable"} />}
        key={"f0e7e8b3-0c5f-4ff8-b8c7-2e8cd63333a5"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2OBrowserTable"} />}
        key={"1b621ce7-b5ef-4fe9-9ce7-929e68a0b73e"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2MBrowserTable"} />}
        key={"db8e896c-2595-4362-b3a0-128f5a729acb"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserTable"} />}
        key={"f420cc96-0e5f-4aca-ac4a-3e5e9b173701"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserCards"} />}
        key={"3ddd2188-334a-4383-ad06-6d2fb92ce148"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserList"} />}
        key={"53aab5b1-2bce-467c-8f8e-167736c7942a"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserTable"} />}
        key={"a545f34a-e985-4bef-b254-3704ab178912"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserCards"} />}
        key={"72914722-31b2-436c-a36b-604d2c1d9ed5"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserList"} />}
        key={"7a69502f-ad6b-48dc-b6c7-501f4cdee94b"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdCards"} />}
        key={"6424b542-be6e-4418-bf42-21b290e3bd4f"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserCards"} />}
        key={"49e55290-98e8-4341-a85f-160addb6576a"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserList"} />}
        key={"84042832-a730-4ba0-895e-a6b129409cf9"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserTable"} />}
        key={"7e17bc43-eb37-432e-856f-709f33d89030"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserCards"} />}
        key={"5bafaeda-b9e1-42c4-ad32-b561a86e050a"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserList"} />}
        key={"df0696bd-1007-4701-9112-9c4e5d246011"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserTable"} />}
        key={"2c393460-1447-4cda-8d3b-2cc7c1af1a3d"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.BoringStringIdBrowserTable"} />}
        key={"dcd758c3-7d23-4381-a931-4fcb4ff7f391"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.TrickyIdBrowserTable"} />}
        key={"8f671b71-d33f-4d25-bb85-b71e3df1f260"}
      />
    </VerticalMenu>
  );
};

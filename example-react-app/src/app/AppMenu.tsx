import { MenuProps } from "antd";
import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-antd";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";

export interface AppMenuProps extends MenuProps {}

export const AppMenu = (props: AppMenuProps) => {
  return (
    <VerticalMenu {...props}>
      <MenuItem
        screenId="HomePage"
        icon={<HomeOutlined />}
        caption={"screen.home"}
        key={"home"}
      />
      <MenuItem
        screenId={"ExampleCustomScreen"}
        icon={<BarsOutlined />}
        caption={"screen.ExampleCustomScreen"}
        key={"dea9bd25-7da8-416b-936c-0105533d62b3"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"e83f12e8-fb47-4db9-8f9c-b00e466200cc"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"8ae41f77-44af-4e79-ab20-e201e0a5384e"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"8018e2d6-35ee-4631-86c3-d3204698defd"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"1d66354c-6c86-486c-9959-a53010f6f7e0"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"8942d974-3200-4cb7-9801-6efa9ec29e90"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"16afb03c-3f8c-4ebe-8dc4-b09206149124"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"ee2b0ce3-e968-4958-8c40-6b9480731ce4"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"77d64fe2-5178-402c-8db0-8c4e440d747d"}
      />
      <MenuItem
        screenId={"CarCardsWithDetails"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsWithDetails"}
        key={"ae5b471a-9eeb-47ca-9288-75772a9f0ef3"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"4b0e959e-d5a5-424d-bd45-68479c141193"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"cc1106f4-649d-40a1-b21b-891de24dfad6"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"95ed7f96-88ff-4196-b2ac-9ece45816583"}
      />
      <MenuItem
        screenId={"CarMultiSelectionTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarMultiSelectionTable"}
        key={"e74f243a-41f4-485e-8860-e8c6df763ea6"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"d0013374-d15e-4906-8332-6abb7a6a73ae"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"a8886fe3-7c0b-4080-abda-8f22fcbf226b"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"6bb38c9c-d5f0-494d-85b3-84676d4e09d8"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"6c5e36c2-47ee-4bbd-ae1a-cc66ad914a9d"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"d94320cc-8744-4fd5-9773-628d850c2e6b"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"6e283fb4-26d4-4057-85ba-d6174851f1ae"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"b70f208f-fb41-45e0-8e16-3c846881fbf3"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"bda1f221-bc31-4d58-9f97-6174c5419cc1"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"73712729-8ddf-468e-8587-5cf16e4f602b"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"dc26f9ca-3161-41d0-822f-e2e9e13da7f4"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"e4497f35-46f6-4581-bbe3-a03a47b28e18"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"6f3e44a8-4cd1-4f8e-9ccd-3b3671e819b6"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"4caee7a5-34f4-4175-b15e-9e0d2152e618"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"0f1c3ce7-b3fd-419a-b504-662b1cd56965"}
      />
      <MenuItem
        screenId={"IntIdentityIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdCards"}
        key={"1841b90f-0fc9-4f99-89ce-a8fb3ce50887"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"7cf551c4-b954-49e2-ba70-867a165d731b"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"35e58f73-919d-449e-9a8f-8b17dee120e5"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"0f3b11b9-68fd-4004-85ed-56887fc648ff"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"0807928a-b452-466c-a631-03904282d1bd"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"55c6637e-6f18-43e3-9d6f-8801169a64db"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"f4819f1e-81d3-463b-b8ec-d414704318d7"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"58f4d3c9-e7ed-42e1-94d5-cf7d1e0de96d"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"e23efe8d-823a-4daf-8ba6-8feeccfc19e0"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"5802a8ab-79a8-492f-9b2b-d615b7ae9e9b"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"f8387d83-e07f-45cd-8f83-8a79114ba22f"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"9db2a456-4310-4cbf-ae25-ddda9fbf8d56"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"2208da10-b0d6-4ff0-9689-2058791d8ae5"}
      />
    </VerticalMenu>
  );
};

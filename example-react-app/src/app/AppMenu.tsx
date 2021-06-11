import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";

export const AppMenu = () => {
  return (
    <VerticalMenu>
      <MenuItem
        onClick={tabs.closeAll}
        icon={<HomeOutlined />}
        caption={"menu.home"}
        key={"home"}
      />
      <MenuItem
        screenId={"TestBlankComponent"}
        icon={<BarsOutlined />}
        caption={"menu.TestBlankComponent"}
        key={"1214a4b6-7bf9-4f9b-ae4d-0593b09562a7"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"menu.StructureComponent"}
        key={"383451e7-bcf1-4889-9e71-44089adf3206"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserCards"}
        key={"49e48e05-8a84-4b66-a323-3d433188fa14"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserList"}
        key={"c1a6fa4a-3b84-4f64-9d53-4516697b31fc"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserTable"}
        key={"f2014590-6a7f-4f32-b1c9-fa0ead2810f4"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"menu.CarCardsGrid"}
        key={"cfe945da-6a4b-4d0d-b3f8-9a2ff062e21f"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"menu.FavoriteCars"}
        key={"b94f3a49-1a41-4446-afd0-207732b09038"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"menu.CarMasterDetail"}
        key={"c9f6b6ee-4bfb-4acd-93c9-4cac6fafb024"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserCards"}
        key={"11f8c007-6991-4771-a5d5-4bec3d53c8bd"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserList"}
        key={"9c78c979-d9ab-45c1-a552-ea77407cca12"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserTable"}
        key={"a2fec8a3-d543-4e3b-8d10-834f048a642b"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestCards"}
        key={"d2994064-d745-4af6-9778-a7757b4166ae"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2OBrowserTable"}
        key={"860bc368-c7ed-4b5b-85df-611577639a3c"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2MBrowserTable"}
        key={"b840f445-c6da-48cf-b79f-40f25def691a"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2OBrowserTable"}
        key={"1e264e91-cab6-451f-811e-68a468e640d4"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2MBrowserTable"}
        key={"aedba530-fce1-4bd3-84c9-b426ad29cd2e"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2OBrowserTable"}
        key={"73f51892-7c5e-4905-80cb-a0804936e8c6"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2MBrowserTable"}
        key={"1fdc5080-2f99-4c46-9d71-f040f37347de"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"menu.DeeplyNestedO2MTestEntityTable"}
        key={"41aea6ff-be7d-4317-9400-e4ffebe813f3"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserTable"}
        key={"7629f0b5-28ac-4965-9cad-14baf93e5bc5"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserCards"}
        key={"3ad6eb31-b406-40ac-95eb-25ea4c3427ec"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserList"}
        key={"0e1f154d-1027-4d51-9652-1a69dd148a71"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserTable"}
        key={"89485c89-f002-4589-99b5-14680c876ddf"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserCards"}
        key={"ed961a75-8161-404f-b9df-b4b322700079"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserList"}
        key={"74c98a62-4248-44c4-9d18-b616869fa7ca"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdCards"}
        key={"6c456232-7c91-437d-ae66-afc5ccb83513"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserCards"}
        key={"dd23b2f9-c266-4666-ae0b-13baa16b3dc3"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserList"}
        key={"69cb8f59-8a7a-428a-a7ab-87f69382e545"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserTable"}
        key={"727e8a04-933d-4aec-adc6-ff4db8ad1891"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserCards"}
        key={"3410e62f-e9d0-45ca-a756-f3bb99851538"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserList"}
        key={"07490a64-cc3e-40d3-9a57-113eee33c44a"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserTable"}
        key={"35050738-027b-43a5-ae01-ca7ab85d6a89"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.BoringStringIdBrowserTable"}
        key={"fc101700-3875-4baf-b875-706bc85b25cc"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.TrickyIdBrowserTable"}
        key={"a2aa537d-2bae-4968-b6a2-a33d9a39b07e"}
      />
    </VerticalMenu>
  );
};

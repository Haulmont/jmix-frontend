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
        key={"d9f2713a-af97-46a1-9a25-9416b1656486"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"menu.StructureComponent"}
        key={"e7791356-3d10-48ef-9ba7-2300bb5039c7"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserCards"}
        key={"00482666-42b2-41a4-9cfa-1d56196e232e"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserList"}
        key={"977e8da5-b21f-45cc-aa5f-dac52db5967a"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserTable"}
        key={"7760d792-345d-4631-8375-f6ea65b5da40"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"menu.CarCardsGrid"}
        key={"76a4eb4f-e3ee-4735-ab64-49828dae6882"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"menu.FavoriteCars"}
        key={"0389d2d8-dba3-4cb3-b982-98cb19f38c6c"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserCards"}
        key={"5d60247c-275a-4c2d-add1-44d0fb4cb7a8"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserList"}
        key={"1b603720-65e7-4e9d-bc31-0691188be05b"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserTable"}
        key={"250ad6af-a8fa-4ee5-afa5-5fd3a667bedc"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestCards"}
        key={"53ae2b3a-fdfe-4a2e-a568-499f8d096b94"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2OBrowserTable"}
        key={"1944bbec-dfa4-4bbb-a315-ff7458b776c0"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2MBrowserTable"}
        key={"42064ea7-a0a7-4f02-86f7-05aa06b47f8d"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2OBrowserTable"}
        key={"d46198f5-d899-46d8-8f96-045c934349f0"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2MBrowserTable"}
        key={"66df3b12-7833-4d04-8bea-9dab28e4ceca"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2OBrowserTable"}
        key={"c1e1806d-20f4-40d7-8bbb-a95a7282d4c8"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2MBrowserTable"}
        key={"ad34a6c0-03a0-4835-8a3b-40a5b66fdfa2"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"menu.DeeplyNestedO2MTestEntityTable"}
        key={"602d55db-1ba1-4ad0-bb96-195b1162bb91"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserTable"}
        key={"4079c4ac-4549-433e-8574-f718895feaf4"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserCards"}
        key={"54420662-83b8-4033-979d-4fab42a6b7de"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserList"}
        key={"4b3b2b2d-5b67-48d1-a8be-2ee8b5c9103f"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserTable"}
        key={"a9197792-89f0-462b-8e8a-0e08b5326bb4"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserCards"}
        key={"5f27eb1e-d745-4f30-9313-610cfbc9757a"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserList"}
        key={"5507f264-ed7d-4f3a-9bbb-ceb63fd3046d"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdCards"}
        key={"29afaed1-1607-4f5b-8ffd-c9a5a186e676"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserCards"}
        key={"3e7dcb6c-44b8-4274-9010-d9ba267b1a47"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserList"}
        key={"71971930-d75a-4da2-ba44-08b3a15f6b3f"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserTable"}
        key={"f926d8e9-586f-418c-b78a-3da461569bef"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserCards"}
        key={"bc36b62c-1daf-4e20-833b-5808b4b4743f"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserList"}
        key={"e81902b0-eb7b-444a-979d-25255afc579f"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserTable"}
        key={"1c728e3b-8d6f-4507-8550-784fce8977d8"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.BoringStringIdBrowserTable"}
        key={"1d43aeed-43a5-4b51-8665-767f469c337d"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.TrickyIdBrowserTable"}
        key={"54d3d403-73e7-46a8-99d4-345a92a81470"}
      />
    </VerticalMenu>
  );
};

import { MenuProps } from "antd";
import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
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
        key={"091129c3-6466-4a41-8f57-ddd7fed68d5e"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"2d3f5bec-6296-4806-925f-e3882ae307d1"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"9e391ee9-a4e6-4581-837c-bb671e2ebfc4"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"4e1c6d11-9d09-4345-8319-80a75e2c6622"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"e7e3ab89-3cda-4f62-a1b2-de0d991add7d"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"ee3a7039-c557-47fd-b5d7-f4723fddf7ea"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"cbc5656c-faea-4938-9ad2-86b0421c7919"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"1fe9fca9-4745-4ba6-87f7-09536831c3ee"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"201204b3-cb5c-49c9-a08e-1dc2d4483312"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"26909d53-04f5-432c-80b0-6b1d11ed40d4"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"da25773d-2fda-4aef-982b-6015643e1654"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"cd3b153a-237c-47fb-8329-988c52f16a09"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"b95c8fec-ebe5-4f9d-8fbb-7b37d1e46b19"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"309b5fdc-f2bc-406f-b884-e23976703f5a"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"def3053d-1f04-4110-ac64-de1cd56892cb"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"7040bf9f-d535-4bc5-9240-bd4f0b16a6e5"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"52fd9f2a-2d02-48aa-b1fa-1a3d86398af5"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"33e61707-0031-45aa-a59b-7da5e6c738a4"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"c1627922-1a31-4e0b-abb6-fda5cfce707e"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"ee8e410f-7c35-44bf-8114-fe97e135ddcc"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"c3a2b280-5606-48b7-bf77-7a2d0974f61c"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"b2d8a6d1-9f80-4369-b05f-4c16b0e90d77"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"e869e252-955f-433f-8c57-c266b4304dfb"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"4dd5f24d-2172-4283-a8de-232b0a704caf"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"c5454be4-d6b5-40a6-9e81-5bc2dc3bcd6f"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"82da1e08-cc5b-4208-a858-07ed5b5e8d63"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"c0ed2f9d-6a4b-4ea9-acb0-a8b010867c4a"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"e52fe450-a477-4ec9-829e-a0a82b83d85e"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"a6125e44-c712-485f-93e9-89485a394813"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"4c0ff50d-cc32-4bb8-b388-5658bf4bd544"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"fbe8e22a-8305-473d-bea4-d6c75b9f6656"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"7fe2436a-ec06-4566-8acd-ce64b1c16f67"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"eeb78d0b-93dc-4bdb-91bc-664b0b7b5558"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"c147cbd4-8a49-4c30-8eee-0a67170d70b0"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"7cad377f-eeb6-4855-b6c8-467437871ed0"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"996f8f6e-5f83-4fb7-accc-dcb7d5f1cb54"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"be676c14-464c-4da2-93a7-8fbbb44ac2ad"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"a5f044e5-ba64-4567-bd6b-37b536c7db9b"}
      />
    </VerticalMenu>
  );
};

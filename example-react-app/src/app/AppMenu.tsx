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
        onClick={tabs.closeAll}
        icon={<HomeOutlined />}
        caption={"menu.home"}
        key={"home"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"menu.TestBlankScreen"}
        key={"2a36b473-8171-43e1-9e3d-99a64a55c0fb"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"menu.StructureComponent"}
        key={"066ce955-e6e8-4bf1-ac05-30c45eb41286"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserCards"}
        key={"1e0b1fa7-a03c-4df4-acb1-ab3a28c886d2"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserList"}
        key={"7b453187-a76e-46cc-9064-9162b49dfcb2"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserTable"}
        key={"73bf3275-1164-4eea-b14e-556b694cb446"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"menu.CarCardsGrid"}
        key={"eecb88fa-0001-409e-806c-5589fa6d5c35"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"menu.FavoriteCars"}
        key={"8081c3ee-f5dd-4db2-af55-d5bd7ae3ff4e"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"menu.CarMasterDetail"}
        key={"3c6e0d8a-04aa-4450-adf5-2efc64cda4f4"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserCards"}
        key={"a5ff6b74-4ef4-4fae-bb02-9ef815a17fc1"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserList"}
        key={"6e278170-e559-426b-8e82-ee451b0517da"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserTable"}
        key={"8e9dc252-c221-4ff3-b52b-9ff833b0197f"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestCards"}
        key={"9413610b-1946-4af1-bf29-e820bbff8df3"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2OBrowserTable"}
        key={"156fb20e-70e0-4bf1-97a5-c7910bb1e689"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2MBrowserTable"}
        key={"7fe5b146-675e-4611-898a-aed7560b6303"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2OBrowserTable"}
        key={"195f7e6a-8586-47cf-8e2d-c69d1efe29a1"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2MBrowserTable"}
        key={"6e713d31-35c4-411f-abd6-37da4f80df36"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2OBrowserTable"}
        key={"55f1920a-db9e-4a2d-b7d1-c8af79327a32"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2MBrowserTable"}
        key={"fd059316-7ac9-4dcc-bff6-854bb9735766"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"menu.DeeplyNestedO2MTestEntityTable"}
        key={"043ef426-b472-4024-bc74-78f416903bca"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserTable"}
        key={"5d3a102b-e51e-4500-9f40-ccaaf5a657fe"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserCards"}
        key={"d641e9b0-a93d-4783-9a3d-ac096d531b3d"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserList"}
        key={"64f35300-0876-4c8b-b68f-ee29eb54c7eb"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserTable"}
        key={"e69277fb-9809-440c-b78b-42bdb8806545"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserCards"}
        key={"d8c3bb38-4f7f-477b-88dc-cc4c57640621"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserList"}
        key={"514bfa38-728c-41e8-ae4d-2b589b3fbc63"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdCards"}
        key={"a7a77761-7d19-4c33-99c0-847a67b8d2d8"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserCards"}
        key={"3f9b3670-95da-49d8-926a-b5cc0a6de753"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserList"}
        key={"6c7d5785-0a15-448b-9fa6-c982fc6704cb"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserTable"}
        key={"33890526-a527-460c-86cc-4ec9c2a44e58"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserCards"}
        key={"a3354017-3d77-448b-b678-5049d2525cec"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserList"}
        key={"1f050e09-54d0-4d48-ab42-59814d947904"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserTable"}
        key={"94e6b65c-740b-46da-ae03-18a1ae05474a"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.BoringStringIdBrowserTable"}
        key={"a1c4b9b0-d463-4768-9b9c-541f1cca45be"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.TrickyIdBrowserTable"}
        key={"bf0c35fb-6031-4711-85b3-b377876631f0"}
      />
    </VerticalMenu>
  );
};

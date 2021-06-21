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
        key={"f92786eb-0716-4f0c-aae6-15ac9c49ab69"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"menu.StructureComponent"}
        key={"0000f66e-07ae-4ea7-9004-4e8c0e1eb143"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserCards"}
        key={"95baaa4e-b577-4eb6-a364-8b6b739fc895"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserList"}
        key={"0376880f-05de-4301-a198-011d84839bca"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserTable"}
        key={"89ccf004-9ff5-467e-931f-b0f2faf39cb2"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"menu.CarCardsGrid"}
        key={"5a72bcbf-5ca5-47da-8f1e-ff2f0babf693"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"menu.FavoriteCars"}
        key={"651ecfba-9b3d-4503-8f75-94616f3d628b"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"menu.CarMasterDetail"}
        key={"3fd46dc6-75f6-495c-8e4b-bc4bf4876d90"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserCards"}
        key={"8f153bd0-daa2-407d-a624-cc29e125d68e"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserList"}
        key={"06f0bdf0-cf3e-4a12-bb98-45851a7dcdcd"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserTable"}
        key={"9c88f1fa-b552-4c67-b287-d292e9e56afa"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestCards"}
        key={"7fad3ae1-0550-4b81-8eb5-9cd3d89c11da"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2OBrowserTable"}
        key={"ded9e699-c4ca-4333-b055-3917840622d2"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2MBrowserTable"}
        key={"e2a98173-a742-43f2-a31f-ee01dfb85878"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2OBrowserTable"}
        key={"46f70ded-444d-4aa3-9526-4d182eda54e3"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2MBrowserTable"}
        key={"80b3cf37-e13c-45d3-bf8a-cf465a1a7ac6"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2OBrowserTable"}
        key={"8b1de516-3c04-49c1-a6e8-21a6c1e9e348"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2MBrowserTable"}
        key={"6bbb4940-7ee7-4a86-b786-e8186f1ad923"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"menu.DeeplyNestedO2MTestEntityTable"}
        key={"40a5d8da-a350-4fd0-a5dd-b0d093af8a9a"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserTable"}
        key={"be2595e1-7289-4b04-a3ba-8f173f247f2f"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserCards"}
        key={"f36917d1-f1c4-4d1f-ae53-87a8cf545c65"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserList"}
        key={"7afa3f91-f8b9-41c5-be93-de9b66c3be4f"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserTable"}
        key={"762cccf4-f3b9-44d3-b271-3b818039649a"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserCards"}
        key={"b969e0bb-90a2-4cde-a66c-256a6ce5142c"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserList"}
        key={"f539bf48-5ba4-42ff-aa8c-fa86d3e1d8e3"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdCards"}
        key={"cda2c5dc-cc28-40f5-a5b5-37a056f60a83"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserCards"}
        key={"58d5bdff-b168-458d-8f8b-d2fcb42fc269"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserList"}
        key={"24c215a9-2f8a-4142-8f24-63241f7a9ad8"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserTable"}
        key={"0722867b-fca7-4e90-b561-069a06d51ca1"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserCards"}
        key={"b3fd6802-fcc6-47e5-aa24-618c1d569177"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserList"}
        key={"b93319e1-64ea-4f8d-8bed-de3f0b99f8f2"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserTable"}
        key={"90393806-2105-4bbb-9b7c-e5dc6139c954"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.BoringStringIdBrowserTable"}
        key={"cbbec04d-782b-4725-8ff4-16c45723d0c0"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.TrickyIdBrowserTable"}
        key={"881cb23d-2bca-47d1-aa2f-38ffd7d23da9"}
      />
    </VerticalMenu>
  );
};

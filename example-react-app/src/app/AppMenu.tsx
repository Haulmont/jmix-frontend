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
        key={"5d20353e-2ff7-4c05-914d-38f4de5e62e6"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"9c3ee205-433a-4b4a-8d19-14aa9084a250"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"6d684a29-70b4-44e9-b77c-b5e805f637f9"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"f442e489-5dbf-4eb9-a350-265be812ff82"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"4b376b9a-a823-4a7f-904b-6e0f46a9ec7f"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"4e814b7a-1360-47e9-a33f-001127b0aa70"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"807293c8-d6b0-46c8-a44b-da5bf30ab17e"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"13a0c328-79c5-41d7-8f6c-1a0872f43882"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"4f98a23c-a4d9-4526-a26d-da2185523541"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"026903fe-70f0-45d5-84eb-5c7b7c6d3d51"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"c68d7fb8-ff0f-4bda-aebe-85c519a1fe9f"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"c6bbbcd1-ed35-4560-a536-743b2dd3caa6"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"2c487384-55ba-4d1b-9bcf-09192bbd8577"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"6aaf557f-06dc-4d88-add1-7346d6fde373"}
      />
      <MenuItem
        screenId={"AssociationO2OEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OEditor"}
        key={"99db0dab-97ca-475b-b7cc-391fa3fe52fe"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"3e970caf-d225-4825-a5b6-f9c064527147"}
      />
      <MenuItem
        screenId={"AssociationO2MEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MEditor"}
        key={"6bc8551c-a6cb-49d3-8c05-a1b7fd8eb928"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"b9d0f8b8-d1f8-4ce2-912f-d359af040834"}
      />
      <MenuItem
        screenId={"AssociationM2OEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OEditor"}
        key={"ba9e6238-c0d7-4ef9-9319-fd90c8b46a69"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"32303f00-2dfc-4bde-9b12-d086a9cc7afc"}
      />
      <MenuItem
        screenId={"AssociationM2MEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MEditor"}
        key={"2b359a08-2a73-4aec-b678-3130f0cab200"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"43c918a0-fe36-4b23-b0d6-ac72f233ef1c"}
      />
      <MenuItem
        screenId={"CompositionO2OEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OEditor"}
        key={"c6703038-7bc0-4dda-ab39-83341275c644"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"5fb9575f-e12d-4a25-ac82-d978ce10b539"}
      />
      <MenuItem
        screenId={"CompositionO2MEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MEditor"}
        key={"939392d8-be4c-4de3-9388-4befde002211"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"ed9978ec-e767-4852-ac5c-4b6ed598dbf9"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"8c45d5d6-1577-4b98-a42f-d0d33915af57"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"b500c318-0c67-4740-91f7-1bca770c36d2"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"2b763f52-4774-485d-baa7-d3228600441f"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"454b573a-a493-4105-987c-548a37f32943"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"efb7a9ed-0483-4c95-89a7-117ae4c4754e"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"d0e9fa32-ce7b-41f7-8da6-e87f34152ac5"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"888e9931-5b42-424d-b65c-2edcd0e64549"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"837cabcb-4cb1-4aea-8af9-401ca49e4872"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"5ab5f66d-5253-435b-bbb6-a8a92efbee9f"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"a624e1db-b2ed-4a19-b4b1-f045dd3cf2e4"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"2f7e45ef-5e6f-4dad-b76a-c8aa2647452b"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"6673ab94-da26-446e-a614-58a5038c02e6"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"cfe3ee4e-f5d8-4cce-9cca-6bb8357f2f8f"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"69a89d63-1a89-4f29-a77c-d032e975127b"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"516d4823-31d0-4ba4-bc10-2fd07ebe046a"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"09455e6e-d522-45b1-9fe4-fa9a7ba2c88c"}
      />
    </VerticalMenu>
  );
};

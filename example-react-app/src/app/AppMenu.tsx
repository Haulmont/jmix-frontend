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
        key={"26bb6b25-81fb-4ee1-906c-3800a963384d"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"ab42d6ca-c299-4db3-8669-904057633655"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"b03a72b1-8e43-4285-be13-c5c0eaa8b439"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"03fed17b-0743-44bb-9912-3532b871991f"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"3d2495d4-828a-4491-ad9e-b7ad90079afa"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"59bba836-f3cd-4dd1-afef-f5d6a92e2644"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"7b0959e5-eeb3-435f-8b89-8ab706fcf62f"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"e5d0db49-6fc0-4d36-a20b-3e75f73e4585"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"cfd9fc9c-2307-4dd6-a06d-a9b51d65eab3"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"b56b0ca3-a187-4181-9c50-ae26cd3e567f"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"b2cd8331-43ab-46e7-9cd0-27de19a4a802"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"392ca55e-06b8-4bc4-98cd-aa40a6227fca"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"33a4ede7-6caa-432b-b9a8-fcd9b54dd228"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"88879da5-82de-4019-bae1-5679d3bea4e1"}
      />
      <MenuItem
        screenId={"AssociationO2OEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OEditor"}
        key={"5630f4d8-70f0-48c3-8bbf-ceb8c85dc9c7"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"72587f53-0807-49a5-a87c-87b237bd6bd4"}
      />
      <MenuItem
        screenId={"AssociationO2MEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MEditor"}
        key={"bb3ff5dd-cced-4833-ad93-02c3daa0da56"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"4d144a82-d10a-422f-a39f-1792d9a716d7"}
      />
      <MenuItem
        screenId={"AssociationM2OEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OEditor"}
        key={"d8c465e7-3793-438f-94ba-42943f83777d"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"8492304b-beb2-428f-af8b-ef54aea31874"}
      />
      <MenuItem
        screenId={"AssociationM2MEditor"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MEditor"}
        key={"f3fd7e14-3350-4c54-84e8-70fa31bf36a5"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"d9ee99bc-cd95-4b15-86bf-b1854dec8975"}
      />
      <MenuItem
        screenId={"CompositionO2OEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OEditor"}
        key={"bbc14537-2193-436b-b352-307f7ce71da3"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"83d4985f-e6de-45b6-bde6-73f371322da3"}
      />
      <MenuItem
        screenId={"CompositionO2MEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MEditor"}
        key={"f4c3ea33-9b9b-4f61-a810-46aa66c00c56"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"cfac03c8-9fb8-4a55-b7d4-f14652d8a5fd"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"1c8bc1f4-5d8b-457a-a3c1-f58a6c053cc3"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"4d6b3fa6-670f-4404-8415-455166b6a483"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"86acced5-24ef-49d4-a2d4-52c5c136e8b3"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"2e0fbe68-bcd2-45ca-acd5-0e51ab41e608"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"4e9a672c-58b7-467d-9ef3-5a266db9c9f4"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"93e210ae-89d5-4a33-a0f5-750cab26f621"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"4ca9dbd9-dabb-4d81-a52b-69bd61cbba64"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"f7c5fbc2-8ae2-4a16-abc6-dd43782b4a46"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"851ed300-f43d-4ae1-9fb4-e5188917a814"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"21b5af11-eafa-4f72-96e1-59680af9739a"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"a7bacf36-0bf6-4994-9917-c779720cc86e"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"7757fdea-990b-4421-9cc2-7d722646990a"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"ef569a3d-053d-4e30-91cd-fcd56384a84e"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"ce75a86b-c2df-4a47-995a-37182fd201bd"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"0f33dea8-9395-4841-9039-a2c06343c78d"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"1d6d8f0a-ca96-49d7-b49d-3e7557e9358a"}
      />
    </VerticalMenu>
  );
};

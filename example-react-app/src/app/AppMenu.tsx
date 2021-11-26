import { MenuProps } from "antd";
import React from "react";
import { VerticalMenu, MenuItem, AddonsMenu } from "@haulmont/jmix-react-antd";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";

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
        key={"81b693e6-2a21-48df-8313-2b352df20497"}
      />
      <MenuItem
        screenId={"CustomFormControls"}
        icon={<BarsOutlined />}
        caption={"screen.CustomFormControls"}
        key={"0aafe806-4cee-47a4-a9b7-c8c425dff286"}
      />
      <MenuItem
        screenId={"CustomDataDisplayComponents"}
        icon={<BarsOutlined />}
        caption={"screen.CustomDataDisplayComponents"}
        key={"b9f97b42-42c0-414c-840f-9a59db1496f5"}
      />
      <MenuItem
        screenId={"CustomAppLayouts"}
        icon={<BarsOutlined />}
        caption={"screen.CustomAppLayouts"}
        key={"b0dcfa47-1467-4dbe-a1d4-f5fc4a852be7"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"975b6ce6-aa8e-4618-8dbe-420ad238a753"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"c694f18d-1fb0-4be4-b9cc-cfeb64063e9a"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"a84b0a05-ce47-4fef-adcb-6d52b25f2193"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"2dcf4099-6723-4dd0-90a0-cb6ca6a527ba"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"1e9bad8d-5b88-45bb-9808-4b97a68ae711"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"32ba964a-f811-4a22-ba5c-0344fc69f7e5"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"b988f747-14a3-4f3d-a193-7a9c457c1d90"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"f2b6c104-af7d-4db7-9982-d0e05a08d1c7"}
      />
      <MenuItem
        screenId={"CarCardsWithDetails"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsWithDetails"}
        key={"65130873-0177-4d02-bcea-f67059de71af"}
      />
      <MenuItem
        screenId={"CarTableWithFilters"}
        icon={<BarsOutlined />}
        caption={"screen.CarTableWithFilters"}
        key={"9ab20a1e-59c1-46ca-8f5e-1fa3c9932223"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"2e2120cc-18d8-4600-bbbd-4f3fe704ec7f"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"2cfe361e-6b78-4dc1-9de9-34051be72619"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"31f8c1a9-2522-46c1-b969-78c28282933a"}
      />
      <MenuItem
        screenId={"CarMultiSelectionTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarMultiSelectionTable"}
        key={"92bd1a0c-b76d-4235-92a5-4c6f39399dd3"}
      />
      <MenuItem
        screenId={"DatatypesCalendar"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesCalendar"}
        key={"61476e48-8940-49f3-8329-51fd454d2802"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"23a328a8-f9b8-4878-b585-d84aa30e6001"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"32e1adbc-5bd9-442b-9db4-07bf8a7c86c5"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"ea786097-f80b-4b60-ae21-e214052cae9d"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"b237ee73-9cbd-4579-9cff-0b0e942dfd5e"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"223cd9b8-9223-4154-be6b-7fdcf1dd2c2e"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"dc419248-452e-4c9e-8caa-eb3c54d5e9cd"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"461bc6f8-3dbd-4145-95a7-cd097975d0bc"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"dd1c34b8-20c9-43ae-8c2f-ce46444173e9"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"3b73ea5f-9153-4911-ac01-66d483a506bd"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"c13e3563-a1cc-4e16-ab5c-d4c3b3a5f2cc"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"d9c56777-277d-4dc5-851d-075aa4eede3b"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"fd665fd4-3e93-4784-a097-452b2012d086"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"7407a194-1dcd-4cf6-90d6-1cdee769e25f"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"b65d2023-9174-4f2a-8802-1aec3b433e29"}
      />
      <MenuItem
        screenId={"IntIdentityIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdCards"}
        key={"e7a3aece-ca97-4d7a-8704-317195a4fe2b"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"492c693a-9f13-4128-949c-dea367578178"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"cdf0a979-2cd0-4be9-b146-cd6ed081b2d7"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"8a7d5c3c-fca9-4324-b637-8862e31dff61"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"30698a9f-8597-42e6-904c-e846c0aebe69"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"242ac01d-b741-496b-b923-8a2bda4d7ef9"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"13f9a2ad-18d1-4325-aeb1-9b2dc757cfaf"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"bf0c401a-a824-437f-86c4-5b1dbf175b10"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"b40b07d7-02e0-4f96-9270-77fba9b5be44"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"5c21d553-3a25-46b2-b4d9-fd445fe7b43e"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"43412f4a-a322-4510-aa09-2496a51d12f7"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"62fea5ec-391e-4ab2-826b-f3171d1aaadc"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"bb691940-c539-41bf-988e-7ad4669064d6"}
      />
      <AddonsMenu key={"addonsMenu"} />
    </VerticalMenu>
  );
};

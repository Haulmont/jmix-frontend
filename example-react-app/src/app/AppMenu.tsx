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
        screenId={"MvpScreen"}
        icon={<BarsOutlined />}
        caption={"MvpScreen"}
        key={"27f6c92d-08ec-495e-86a8-5755a22c918a"}
      />
      <MenuItem
        screenId={"MvpScreenEditor"}
        icon={<BarsOutlined />}
        caption={"MvpScreenEditor"}
        key={"27f2c92d-08ec-495e-86a8-5755a22c918a"}
      />
      <MenuItem
        screenId={"ExampleCustomScreen"}
        icon={<BarsOutlined />}
        caption={"screen.ExampleCustomScreen"}
        key={"27f6c9bd-08ec-495e-86a8-5755a22c918a"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"89395fc5-d6ac-4023-85b3-1c39626f4f15"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"a7e7d0e4-7f69-4b32-b646-75e6975caa7d"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"fee4a964-9e02-4824-9388-0da3b1c0d43e"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"9dd3a3f9-b7d6-4911-8519-cbdd04ba2f23"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"3e1a09bf-6b13-410d-a1c5-d46abd03ff11"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"eb2d502c-d908-44fe-9c09-486140fd0ae3"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"b9ffec3d-7004-40a4-8c69-1b2885eadbd1"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"cdb878f2-0e3f-4b2a-8d12-397bd816707a"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"493722f8-a1de-41ff-9a91-f836abdea769"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"451f3858-0ade-418d-ac83-2c62b4567f43"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"eb90ce74-3bac-4ba1-8e7c-3f4f6a9fb0c0"}
      />
      <MenuItem
        screenId={"CarMultiSelectionTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarMultiSelectionTable"}
        key={"bbf1a4c8-fa7a-4ccc-9405-3d1390f81b02"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"857f5603-2f10-41ff-900f-a8ff01cf3562"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"f93d996a-fb2a-4fd6-8bd0-0e2d59d7d037"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"49d454f9-524f-45b6-9e68-ee9a3b3009fb"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"247682fe-9d3f-48f1-a6f6-19154359bd3a"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"56259a32-2238-4594-a491-a665d8b245d3"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"8c754374-149c-4301-8ff0-7e4d15a3f19e"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"99b5dcb4-5570-4ff4-badf-4a72f765d748"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"12a5e963-bbcd-42f5-b086-b49bbb90451e"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"f4c67c60-d5cc-4594-a2ae-1d2c9a3aaaa9"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"6261962d-8423-43db-913c-a1364c51ac00"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"a3de9472-53fa-43ac-8277-7742c01d40e8"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"8da4ac82-fb77-48a6-bddc-444622b84b6c"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"78f0e3ad-cdc1-40c6-b9cf-40754da7ee44"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"e7b3e738-6ab6-4d1a-9f19-62870054ef62"}
      />
      <MenuItem
        screenId={"IntIdentityIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdCards"}
        key={"98821c92-90d9-4bc0-9d1e-740b28dbb5f2"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"79f71086-cffd-4d6b-8c13-8a0a1b21ee72"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"2fa36ae8-7888-4f68-b773-3650a8b40aff"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"7714f409-85b0-4bf3-b2ec-e33736b6c552"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"a000b560-95eb-4ab7-8fcd-39a53a80a233"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"2bbb928b-e095-4577-9e44-ef98e486ff3c"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"c9a9e18b-8c59-42d9-a4ab-460debeaf48b"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"07be560c-e7c1-4277-9cf7-d7c3181c3d89"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"fbe36462-f61d-4f4a-ad80-516e3a1a9ce2"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"98bd6253-6c71-4a0b-9624-b7777d044e4a"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"25214578-c212-4901-9082-c141cc78b0fc"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"4b568fb7-58c5-479e-ae9a-0191edb3a5cc"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"1765845a-3c32-4789-8af0-12c0a4dbb24d"}
      />
    </VerticalMenu>
  );
};

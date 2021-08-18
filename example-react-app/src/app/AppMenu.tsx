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
        key={"deaa9a98-3f98-446c-bf86-de4a3a89f140"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"9863eea7-9447-4c70-ba96-986e87aaf025"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"5fa0570f-da54-4101-9c86-3e44ad27ef36"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"2fecbc45-5ff7-4322-970a-0fa3d6e390df"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"cbecdcb5-63a4-4557-a4c3-d99f11c40d4d"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"934f221a-aee8-431b-af39-cb37843b5eec"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"faadc514-5f8c-4b13-a861-20ff1f197b2f"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"9b745a41-a5f6-46e0-a95f-dad9b0c557ec"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"96142973-6c62-4e53-9ea9-ac76ca760987"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"e2fb06bf-79b9-46b6-8749-e893af5bd60d"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"8fc8b558-ba19-4bb4-9a70-9ff2207354e2"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"a000eeaa-72a3-4f69-9603-8588c57eab87"}
      />
      <MenuItem
        screenId={"CarMultiSelectionTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarMultiSelectionTable"}
        key={"53351f6a-9232-48e3-9b02-682a275062ef"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"38f923c5-81b8-406d-81a5-437e8ff852c2"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"0bd0aca1-65b7-4ea4-ba8e-b7ed4c915699"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"9635737e-e021-435f-819f-9afc3292debd"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"067ae0e8-e0f6-42bc-82de-60746159ae8d"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"b0028be1-45bc-490d-805f-6c69b6e2ee6c"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"3e8cb378-b128-443b-abd3-1becdb319cda"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"06969c45-b077-4e87-8e1f-9180b109fee3"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"1718d6ea-e803-4cdb-8203-5d3521e152e4"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"00d912db-4721-4087-b226-014ede8440a8"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"59316c65-2c2e-4866-871c-be1b00ad738a"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"3d11abd2-ca3f-49c0-993c-f4eb9f2e9601"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"fd1531fb-c13a-45aa-a757-bfa3c20f2186"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"dc129705-79e7-4d28-85ba-fe851a4d7ad9"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"75d66921-fa81-485c-9aa8-959108a6a2d2"}
      />
      <MenuItem
        screenId={"IntIdentityIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdCards"}
        key={"00af35e0-aad9-4e94-bb5d-9565d26066d1"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"d29681d1-5b4d-4546-9da5-6b74fd98a818"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"6ec5f974-4a40-4f36-ac44-33837a5c3541"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"f71e1a7d-e47c-4c2d-b9b8-4b60218d15b2"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"e25ef598-d4bb-4ff2-a8cc-d822af907e00"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"e108e3c3-c2b5-4b86-beaf-d7aee5348328"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"16127907-376b-441f-b801-fa986c1d9fb3"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"fe43869c-c797-4081-a020-fcf82790a20d"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"622ff021-b0e6-4436-b0f2-b3ff48c50bab"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"ad6c8ab7-0265-4d64-bd31-46d0675635d3"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"9a1c5ddf-c1b1-4dd6-bac1-a8104c62b39a"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"5029c229-30fd-42e5-a413-a764a1c44f66"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"5f670012-80bc-46b5-856c-ef059f1f2ec2"}
      />
      <MenuItem
        screenId={"MvpScreen"}
        icon={<BarsOutlined />}
        caption={"screen.MvpScreen"}
        key={"c1d2420d-382b-420a-9cce-9abe37db1269"}
      />
      <MenuItem
        screenId={"MvpScreenEditor"}
        icon={<BarsOutlined />}
        caption={"screen.MvpScreenEditor"}
        key={"f846a94b-bd76-4eab-bb0f-3802375ac05c"}
      />
    </VerticalMenu>
  );
};

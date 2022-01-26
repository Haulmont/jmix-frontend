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
        key={"3bbadb7e-1276-490d-9ad3-c02ab272a2fd"}
      />
      <MenuItem
        screenId={"CustomEntityFilterTest"}
        icon={<BarsOutlined />}
        caption={"screen.CustomEntityFilterTest"}
        key={"e785c7af-a13f-4aa0-9d02-558f17ea0309"}
      />
      <MenuItem
        screenId={"CustomFormControls"}
        icon={<BarsOutlined />}
        caption={"screen.CustomFormControls"}
        key={"3f30171e-f518-4b79-82c1-ea49e8e9106f"}
      />
      <MenuItem
        screenId={"CustomDataDisplayComponents"}
        icon={<BarsOutlined />}
        caption={"screen.CustomDataDisplayComponents"}
        key={"95ab787e-a70e-4eeb-ac74-83ecd980916f"}
      />
      <MenuItem
        screenId={"CustomAppLayouts"}
        icon={<BarsOutlined />}
        caption={"screen.CustomAppLayouts"}
        key={"709ef985-400c-4526-9726-537f32268ecb"}
      />
      <MenuItem
        screenId={"CustomControls"}
        icon={<BarsOutlined />}
        caption={"screen.CustomControls"}
        key={"125721e8-3d71-464b-8d65-674803603cc2"}
      />
      <MenuItem
        screenId={"ErrorBoundaryTests"}
        icon={<BarsOutlined />}
        caption={"screen.ErrorBoundaryTests"}
        key={"08867fc7-db42-43d5-a8ed-6e45b0762989"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"689f4f93-cb7a-4d6e-aaf2-b4429cf68118"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"9200dcf4-db60-4841-a3db-237d8fff7ffa"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"cc2efba0-b269-4a91-a626-71a5396e0b66"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"6d555511-8776-4bf5-ad55-d96dfac665df"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"5159a0f7-1a42-4586-aff6-9ae53e89f442"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"932e9c09-c982-4bae-b3a2-c49df4e21742"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"647cb1db-d14f-4188-88c2-7b59aeb67455"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"cffcde2a-0855-4690-8dd6-fa6426487855"}
      />
      <MenuItem
        screenId={"CarCardsWithDetails"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsWithDetails"}
        key={"5e8f14d4-245a-4e42-be75-98b8f762313a"}
      />
      <MenuItem
        screenId={"CarTableWithFilters"}
        icon={<BarsOutlined />}
        caption={"screen.CarTableWithFilters"}
        key={"72c0e029-eac6-41ec-8634-236db33b04c2"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"ff8454b1-cd6e-4451-86e8-1b0a64cc9051"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"7018f442-cbd9-40c6-a141-17317e7694d2"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"ecbb9a1c-d003-4637-b2a7-56cf491d5ff4"}
      />
      <MenuItem
        screenId={"CarMultiSelectionTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarMultiSelectionTable"}
        key={"9c3bf568-6d51-406e-ab04-d6da9ffbcd45"}
      />
      <MenuItem
        screenId={"DatatypesCalendar"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesCalendar"}
        key={"7ddd81ef-cb1e-4193-88ca-02c1817059a1"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"6c429036-2f02-41cc-b69c-a3d711d102c2"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"125107c6-bf95-4ec3-b478-6a1474f20003"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"d5341725-65e1-4100-8d13-02e4a6f32173"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"3d1dea95-1ef8-489a-8127-a07edc755a94"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"57ca3f40-56fe-4b35-83a8-0ccc1ab03941"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"e3ec0c15-d72e-4169-9873-1ce81056cc56"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"dcbdc730-bfba-40ce-9244-516994bfa861"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"d761dfa5-6bfa-4ac1-9207-42c554bd6696"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"f732367b-a2eb-4f4f-93ce-85fbc96a5b98"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"91d64c96-ff38-49d5-9af1-72c54952d38e"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"e86cd9b6-cd71-45c2-bdd3-77a191257e02"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"92373209-2c40-4934-bc83-e99ef92ecdce"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"d339774d-19e2-489d-b426-eaa731a58591"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"10a3fa2a-4f1c-47d5-991d-b78774d22a06"}
      />
      <MenuItem
        screenId={"IntIdentityIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdCards"}
        key={"a882ff22-566e-4b2f-a835-cc13ff258f52"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"d6586c81-d089-45db-8430-fe9320652718"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"c4fc9018-1608-43c1-b727-5fda9bfa4735"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"51db5ccb-04d7-420f-9328-9999cb90996a"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"c28e31a3-943b-4d69-9238-9384b4a94413"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"5dd7c620-35f0-4037-8d40-1bfce7a088dc"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"ed1600b0-f0f8-4f71-a618-e316be3e2970"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"ce34e3f6-06c7-4b99-bede-7469895ded6d"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"caf537ac-300b-459c-90ca-dce79b24d096"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"1ac94340-3fdd-4ac2-b848-fc04f4bc2f63"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"b66adb8b-e74d-4f1c-9ea7-b52ee75d6a5c"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"f5dbcfef-33bb-4ad9-89b5-b9b1fee44ae0"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"246522c0-4e40-43dd-ae4d-0046f7d9daf0"}
      />
      <AddonsMenu key={"addonsMenu"} />
    </VerticalMenu>
  );
};

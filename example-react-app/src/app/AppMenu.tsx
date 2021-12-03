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
        key={"8a31bf50-1575-46cc-a7df-2be02298bcdd"}
      />
      <MenuItem
        screenId={"CustomFormControls"}
        icon={<BarsOutlined />}
        caption={"screen.CustomFormControls"}
        key={"bf274c85-336e-4037-9908-f859f858cf05"}
      />
      <MenuItem
        screenId={"CustomDataDisplayComponents"}
        icon={<BarsOutlined />}
        caption={"screen.CustomDataDisplayComponents"}
        key={"9bc14b20-091c-4092-b6ae-9f8a5c4d04bc"}
      />
      <MenuItem
        screenId={"CustomAppLayouts"}
        icon={<BarsOutlined />}
        caption={"screen.CustomAppLayouts"}
        key={"655856cc-106c-4fa4-b7ef-c54eaea5bc37"}
      />
      <MenuItem
        screenId={"CustomControls"}
        icon={<BarsOutlined />}
        caption={"screen.CustomControls"}
        key={"6b265007-4a61-4cb4-870f-763ca29c8aa1"}
      />
      <MenuItem
        screenId={"ErrorBoundaryTests"}
        icon={<BarsOutlined />}
        caption={"screen.ErrorBoundaryTests"}
        key={"2e446840-e85b-43e6-94b8-01924e8f541e"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"37dc1151-e43f-45b6-9f6b-894f014ab902"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"7644d625-0f96-482b-9c50-5b88da7c01c1"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"09187e02-9fee-4c88-93c5-7340badc0372"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"70960295-00ab-4f35-ab80-024059c51da6"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"40ed2fbb-146e-4bac-a919-4954bb834bb5"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"0ae3f1a1-a4a5-442a-8c8e-d39cd0041c89"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"31c0634b-a26f-41be-b43e-97b90c499f09"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"8c1d4f99-f962-4ff7-939c-719a05e38f06"}
      />
      <MenuItem
        screenId={"CarCardsWithDetails"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsWithDetails"}
        key={"806125b6-9577-43c3-bd06-21664f3b3466"}
      />
      <MenuItem
        screenId={"CarTableWithFilters"}
        icon={<BarsOutlined />}
        caption={"screen.CarTableWithFilters"}
        key={"fd780d02-ecbe-49ad-8d46-9bab887d447f"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"dd05d903-fb62-4448-9759-6d329f75755c"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"7ea4b263-a82a-4692-9362-f8266aed2a23"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"9a529190-671d-491b-b273-2ff569e650fe"}
      />
      <MenuItem
        screenId={"CarMultiSelectionTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarMultiSelectionTable"}
        key={"ddbdcf25-d569-4ce2-8849-469ac256970b"}
      />
      <MenuItem
        screenId={"DatatypesCalendar"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesCalendar"}
        key={"fdf738e8-755a-4ab3-9057-3083d1d720a5"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"da65e076-8d92-4338-a915-e84a2f02e40d"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"1dc6e26a-b4c0-4e36-ad02-1a096200d9e4"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"04471835-0ddb-45c9-a364-a32b75ab7052"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"d5014f58-d83a-47a4-a2f3-ba38b7f4e449"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"1094080e-96f9-41af-9f87-d3998a0f00b0"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"03063bca-dda8-48e9-8d88-31e52221f63e"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"8c8800f8-ca22-44ba-9278-e269e24f6fab"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"bda73deb-ec35-462c-a26a-3a00a14521cb"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"18606a05-fd3b-4128-a914-d73460867e40"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"1b5bd338-11d7-4e6b-bda2-a65d0934b624"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"61472f1f-0529-4cf6-aebf-a85128a98d98"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"bbdcd55c-72af-401c-99fa-abc7193e962b"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"2566dde0-8025-49d9-86b3-c02595608482"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"faeb03cd-d233-42b5-831f-05fbbf805dd7"}
      />
      <MenuItem
        screenId={"IntIdentityIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdCards"}
        key={"8cc0fbb6-fec5-43cc-bda3-0391fd14a43d"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"0b509745-9544-480b-8152-e52254d91a85"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"7e2c1dcf-0c36-42bd-b1d0-b7f44cbdcab2"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"7d77cc67-2a70-403e-90ae-71936d5f6104"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"979a3eab-f9dc-4c83-808b-6169cb436492"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"fb580cdd-2995-4037-973c-c95ab55809ac"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"c8bbee9f-5b03-4362-a82c-fd4fe693c921"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"7f02fdae-1088-439c-bf3e-fb7ca02e2eae"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"2936891e-6fd5-44b0-96bd-9877e5c15c8c"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"1a03976a-4b8b-4776-a8f9-edaa1bfa8fc5"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"362860d8-a6e4-4093-85b9-f314c21aa5eb"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"70c28466-e939-43f7-ba63-3e074166e9c1"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"0ac137fe-5ad8-4826-8c72-57d06565adbc"}
      />
      <AddonsMenu key={"addonsMenu"} />
    </VerticalMenu>
  );
};

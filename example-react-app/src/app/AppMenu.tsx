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
        key={"6af53d32-cbf9-40a5-ade4-8e990186a427"}
      />
      <MenuItem
        screenId={"CustomFormControls"}
        icon={<BarsOutlined />}
        caption={"screen.CustomFormControls"}
        key={"251bd4de-2af1-402b-9deb-eba7347e4341"}
      />
      <MenuItem
        screenId={"TestBlankScreen"}
        icon={<BarsOutlined />}
        caption={"screen.TestBlankScreen"}
        key={"94645913-fbb0-4f59-a7f5-16f5aca2c71a"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"screen.StructureComponent"}
        key={"5850d19b-12ef-4ee4-a3a6-f103912f64c0"}
      />
      <MenuItem
        screenId={"CarEditor"}
        icon={<BarsOutlined />}
        caption={"screen.CarEditor"}
        key={"1459e067-d308-4b89-8f13-33eb1616eb98"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserCards"}
        key={"ff071d70-1078-46a7-898f-5139385ca1af"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserList"}
        key={"72fb5299-1777-4c7e-bd07-068fd1266a1f"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarBrowserTable"}
        key={"3339729d-73cb-4170-9efc-d5240d300ff6"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsGrid"}
        key={"bfb021b0-64be-4047-8058-73666dfa91a5"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"screen.FavoriteCars"}
        key={"cf10c953-b536-47aa-b40f-2a2eb81a90d8"}
      />
      <MenuItem
        screenId={"CarCardsWithDetails"}
        icon={<BarsOutlined />}
        caption={"screen.CarCardsWithDetails"}
        key={"81d5186f-cf14-4c5f-bc55-77b308c1399a"}
      />
      <MenuItem
        screenId={"CarTableWithFilters"}
        icon={<BarsOutlined />}
        caption={"screen.CarTableWithFilters"}
        key={"eedcef6c-bb0f-48b4-92a8-fd6c0e60a4cf"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"screen.CarMasterDetail"}
        key={"2c51352b-d9e2-4c9a-98d0-34c248ed17cd"}
      />
      <MenuItem
        screenId={"FormWizardEditor"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardEditor"}
        key={"7523e0fb-5bb2-46cf-baa8-54d85be31d63"}
      />
      <MenuItem
        screenId={"FormWizardBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.FormWizardBrowserTable"}
        key={"3227e78f-21c4-4fce-8503-cba556dac2e0"}
      />
      <MenuItem
        screenId={"CarMultiSelectionTable"}
        icon={<BarsOutlined />}
        caption={"screen.CarMultiSelectionTable"}
        key={"ad99b140-9e53-432d-8fb9-de71b7220373"}
      />
      <MenuItem
        screenId={"DatatypesCalendar"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesCalendar"}
        key={"f6db194c-e096-43bf-9b30-b070e80ca088"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserCards"}
        key={"be00f09e-569f-42bf-92ef-ba26e88f2132"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserList"}
        key={"615e95cc-ed6f-4ed7-9333-345fa42c7161"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestBrowserTable"}
        key={"6bcd6212-3b77-4000-9f0b-20d33ca787c5"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"screen.DatatypesTestCards"}
        key={"f9c3161b-9cf9-492f-8bc8-9ef08ea43a77"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2OBrowserTable"}
        key={"3de2fc4d-05c5-4294-951f-4196656cd2cc"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationO2MBrowserTable"}
        key={"149784fd-dafa-4fd0-b2c6-1d9b39180134"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2OBrowserTable"}
        key={"4c1f73e4-a555-4246-86ed-b3a2dfcbb71f"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.AssociationM2MBrowserTable"}
        key={"0749afbe-0300-41f8-846d-1caa77d24f70"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2OBrowserTable"}
        key={"64486126-df84-4e1c-a2cc-81d48705194f"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.CompositionO2MBrowserTable"}
        key={"fd4f70b4-ce43-4cea-b680-95d68c0c8bbe"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"screen.DeeplyNestedO2MTestEntityTable"}
        key={"8a7ea198-f113-4334-bd98-bedc1f5167c2"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserTable"}
        key={"eb414185-8283-49de-9e42-7e9a9e069772"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserCards"}
        key={"175b8123-b06c-4b24-a8f3-209da8517660"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdBrowserList"}
        key={"bd1ed7cd-6184-4d70-bd73-2db091d7d1d9"}
      />
      <MenuItem
        screenId={"IntIdentityIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdCards"}
        key={"f5fa9078-dc80-47dd-89c1-4509d61615eb"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserTable"}
        key={"87da1bfa-6ae4-43e1-926a-6630e961984a"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserCards"}
        key={"34342037-c81e-433b-9739-fbe64ef3fc33"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.IntIdentityIdBrowserList"}
        key={"b95cf34f-881c-4de0-b84d-57c0547653b9"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdCards"}
        key={"6c55da87-2ec4-4a57-ae26-25d24d851901"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserCards"}
        key={"cd3c6892-9b4f-4679-96f2-2ad1154da93b"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserList"}
        key={"e2949768-3318-4a16-bd9f-4478496eeb59"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.StringIdBrowserTable"}
        key={"7990e57a-f68c-4998-9756-da2535061c01"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserCards"}
        key={"bfe3e22d-bdf7-4ca9-8a45-a03ab36c0aff"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserList"}
        key={"c1dd1d14-3f9f-4913-9524-6c8daf845ed8"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.WeirdStringIdBrowserTable"}
        key={"dc74e4bd-2daf-44c9-86f8-270eee19e4a3"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.BoringStringIdBrowserTable"}
        key={"fdac4c25-3e35-46ca-87dc-fbc58a581910"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"screen.TrickyIdBrowserTable"}
        key={"faacb592-5fd2-44f3-8b0e-fe0495bf8064"}
      />
      <AddonsMenu key={"addonsMenu"} />
    </VerticalMenu>
  );
};

import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";

export const AppMenu = () => {
  return (
    <VerticalMenu>
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
        key={"b76a4593-566f-47ca-9109-3fba409f3c5f"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"menu.StructureComponent"}
        key={"c9f5e4d7-9ff9-4c37-9aba-b182c312f3f0"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserCards"}
        key={"8533b06f-ec6a-4fb4-b339-df508a97d239"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserList"}
        key={"644d54a7-cc55-4d15-8413-b73d285793c0"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CarBrowserTable"}
        key={"93f352f4-ed95-46a2-80d9-63cfd9dc965d"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"menu.CarCardsGrid"}
        key={"725eb03f-68e0-4679-8a83-8fb009fab305"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"menu.FavoriteCars"}
        key={"a78817ef-403c-4130-af0c-2012a60ae288"}
      />
      <MenuItem
        screenId={"CarMasterDetail"}
        icon={<BarsOutlined />}
        caption={"menu.CarMasterDetail"}
        key={"14fb044f-682e-47f7-a5d9-7b852f1fa28f"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserCards"}
        key={"ab5f0dd7-05c7-4a7f-bab9-3012898fd38d"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserList"}
        key={"f1d18d55-c962-4001-bf4a-7e0608473566"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestBrowserTable"}
        key={"4f918fac-bda0-47af-bf35-e8c710da485e"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"menu.DatatypesTestCards"}
        key={"10275662-9001-47fe-b79a-45f7f7cd81cf"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2OBrowserTable"}
        key={"5edd6329-5108-49cb-8367-01699c8da4f1"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationO2MBrowserTable"}
        key={"1bc3f701-89b9-4268-8f12-e2d05ac1245e"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2OBrowserTable"}
        key={"16a8e44a-c505-4f2e-96d5-047335d453de"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.AssociationM2MBrowserTable"}
        key={"2e9a2b54-83cb-4b74-bb0d-d78080a2e28e"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2OBrowserTable"}
        key={"cc3fca3b-2285-40a7-b9fb-d08c72a202cf"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.CompositionO2MBrowserTable"}
        key={"9f7af07f-4c9c-48bd-88bc-2db85b7702ac"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"menu.DeeplyNestedO2MTestEntityTable"}
        key={"c7b569e4-cf34-4a05-af08-b8118c920636"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserTable"}
        key={"971061c7-d395-4351-9a1d-2252b8976a42"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserCards"}
        key={"dbe78958-7a76-435a-931c-7fa61447d9f1"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdBrowserList"}
        key={"e1b5b1a0-9b77-4c37-87a3-c5d353440c2b"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserTable"}
        key={"39c7bfd0-ebd5-4616-a38c-78ded069f1d7"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserCards"}
        key={"f7ec059b-fa1a-4f54-9f14-152ea561b13c"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.IntIdentityIdBrowserList"}
        key={"fdebfe07-5458-4f00-ac50-b0259553a626"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdCards"}
        key={"4daf59c0-c285-46f2-a708-22f6cc8c490e"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserCards"}
        key={"70f0fb10-bd13-443d-8e87-047dee5c805a"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserList"}
        key={"6b7ccf83-f3a8-4e9a-8537-c3cb62b0bbe0"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.StringIdBrowserTable"}
        key={"487c3158-74ad-493e-b536-7c5172d12903"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserCards"}
        key={"0f6022b6-39c0-4dbf-b697-108692221bb6"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserList"}
        key={"4536fd1f-c4eb-4488-ace9-4820bdb26f7b"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.WeirdStringIdBrowserTable"}
        key={"73692230-900a-454e-8ac5-0a6c35142ff6"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.BoringStringIdBrowserTable"}
        key={"074654a5-3d08-48af-8d8a-dfa49997f0aa"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"menu.TrickyIdBrowserTable"}
        key={"d3df2f79-192b-43a3-a05b-b5c43fe51b9c"}
      />
    </VerticalMenu>
  );
};

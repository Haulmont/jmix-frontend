import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";
import { FormattedMessage } from "react-intl";

export const AppMenu = () => {
  return (
    <VerticalMenu>
      <MenuItem onClick={tabs.closeAll} icon={<HomeOutlined />} key={"home"}>
        <FormattedMessage id="router.home" />
      </MenuItem>

      <MenuItem
        screenId={"TestBlankComponent"}
        icon={<BarsOutlined />}
        key={"f1ff520a-f8d3-4e85-b35a-19a066774b6a"}
      >
        <FormattedMessage id={"router.TestBlankComponent"} />
      </MenuItem>

      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        key={"d3f16e6e-4929-4180-b3a5-42582d788913"}
      >
        <FormattedMessage id={"router.StructureComponent"} />
      </MenuItem>

      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        key={"c3abdbb6-14f8-4a5a-b32d-2fa7ff0f590e"}
      >
        <FormattedMessage id={"router.CarBrowserCards"} />
      </MenuItem>

      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        key={"507f9c19-9fe9-4a23-a61b-050af18db2b3"}
      >
        <FormattedMessage id={"router.CarBrowserList"} />
      </MenuItem>

      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        key={"8f0fb11f-6172-4f3c-ba5b-12dfd02ec589"}
      >
        <FormattedMessage id={"router.CarBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        key={"989154e1-ea5c-4799-92d7-dbc17712c18b"}
      >
        <FormattedMessage id={"router.CarCardsGrid"} />
      </MenuItem>

      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        key={"0ec9f262-24b4-4e7d-a10b-feeb0f067113"}
      >
        <FormattedMessage id={"router.FavoriteCars"} />
      </MenuItem>

      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        key={"01e5641f-6e76-42d5-8eab-4f031d998d88"}
      >
        <FormattedMessage id={"router.DatatypesTestBrowserCards"} />
      </MenuItem>

      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        key={"5527c296-7554-410d-965a-ab893d98d490"}
      >
        <FormattedMessage id={"router.DatatypesTestBrowserList"} />
      </MenuItem>

      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        key={"95d871a3-3707-4876-a6d8-cca141bef7a2"}
      >
        <FormattedMessage id={"router.DatatypesTestBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        key={"e8f39e69-0581-472d-a08d-1d4c1a690ba3"}
      >
        <FormattedMessage id={"router.DatatypesTestCards"} />
      </MenuItem>

      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        key={"0e79d319-16a7-45d5-add3-c8cd0f9d1984"}
      >
        <FormattedMessage id={"router.AssociationO2OBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        key={"be0376de-4e9e-47c9-9ded-56d81c7618fc"}
      >
        <FormattedMessage id={"router.AssociationO2MBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        key={"96c85415-226f-4b7c-a50b-e9cf1a25e8b4"}
      >
        <FormattedMessage id={"router.AssociationM2OBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        key={"93533c36-fb02-4f94-b2ba-d7f8f2baad08"}
      >
        <FormattedMessage id={"router.AssociationM2MBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        key={"ddd3f744-8bea-4caf-923e-4693231fe1db"}
      >
        <FormattedMessage id={"router.CompositionO2OBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        key={"e3557290-d5b1-4b5b-a290-3668b2ddaa32"}
      >
        <FormattedMessage id={"router.CompositionO2MBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        key={"ab97e61a-5c2e-4c0c-b92d-997646215fd8"}
      >
        <FormattedMessage id={"router.IntIdBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        key={"90c4212a-3dd5-4a13-bca7-4c92f2c59df4"}
      >
        <FormattedMessage id={"router.IntIdBrowserCards"} />
      </MenuItem>

      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        key={"d782d86e-6d63-4ed5-86b3-d3a1431a5bc4"}
      >
        <FormattedMessage id={"router.IntIdBrowserList"} />
      </MenuItem>

      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        key={"5ea8239e-4b19-49a1-a448-febcea1dc223"}
      >
        <FormattedMessage id={"router.IntIdentityIdBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        key={"e1bf0a09-f73b-4138-b96b-c18dfc48d69a"}
      >
        <FormattedMessage id={"router.IntIdentityIdBrowserCards"} />
      </MenuItem>

      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        key={"4e98c97f-0832-41ca-b361-0b8c22b71eb0"}
      >
        <FormattedMessage id={"router.IntIdentityIdBrowserList"} />
      </MenuItem>

      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        key={"625c9f36-930e-4bc7-963b-7b2de23eb3ad"}
      >
        <FormattedMessage id={"router.StringIdCards"} />
      </MenuItem>

      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        key={"cc51f68e-fa68-4ff5-94c9-29344d0ce95f"}
      >
        <FormattedMessage id={"router.StringIdBrowserCards"} />
      </MenuItem>

      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        key={"b4f09cd2-e3b0-4993-9071-ec5c8c77c344"}
      >
        <FormattedMessage id={"router.StringIdBrowserList"} />
      </MenuItem>

      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        key={"2260cdd5-d680-4895-a523-26036abd3a11"}
      >
        <FormattedMessage id={"router.StringIdBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        key={"28b83e50-e092-4d5c-adab-770b2acf6c75"}
      >
        <FormattedMessage id={"router.WeirdStringIdBrowserCards"} />
      </MenuItem>

      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        key={"0289ad24-cb78-4c5e-bda3-790549920346"}
      >
        <FormattedMessage id={"router.WeirdStringIdBrowserList"} />
      </MenuItem>

      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        key={"93d93f6f-f789-4e5d-98e3-1c1d1613d91c"}
      >
        <FormattedMessage id={"router.WeirdStringIdBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        key={"9b240681-b893-4c94-b2ba-5d4ad7605058"}
      >
        <FormattedMessage id={"router.BoringStringIdBrowserTable"} />
      </MenuItem>

      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        key={"cee9be1f-322c-4519-bb51-af32a6837bb5"}
      >
        <FormattedMessage id={"router.TrickyIdBrowserTable"} />
      </MenuItem>
    </VerticalMenu>
  );
};

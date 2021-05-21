import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";
import { FormattedMessage } from "react-intl";

export const AppMenu = () => {
  return (
    <VerticalMenu>
      <MenuItem onClick={tabs.closeAll}>
        <HomeOutlined />
        <FormattedMessage id="router.home" />
      </MenuItem>

      <MenuItem screenId={"TestBlankComponent"}>
        <BarsOutlined />
        <FormattedMessage id={"router.TestBlankComponent"} />
      </MenuItem>

      <MenuItem screenId={"StructureComponent"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StructureComponent"} />
      </MenuItem>

      <MenuItem screenId={"CarBrowserCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarBrowserCards"} />
      </MenuItem>

      <MenuItem screenId={"CarBrowserList"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarBrowserList"} />
      </MenuItem>

      <MenuItem screenId={"CarBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"CarCardsGrid"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarCardsGrid"} />
      </MenuItem>

      <MenuItem screenId={"FavoriteCars"}>
        <BarsOutlined />
        <FormattedMessage id={"router.FavoriteCars"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesTestBrowserCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesTestBrowserCards"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesTestBrowserList"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesTestBrowserList"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesTestBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesTestBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesTestCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesTestCards"} />
      </MenuItem>

      <MenuItem screenId={"AssociationO2OBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationO2OBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"AssociationO2MBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationO2MBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"AssociationM2OBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationM2OBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"AssociationM2MBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationM2MBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"CompositionO2OBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CompositionO2OBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"CompositionO2MBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CompositionO2MBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"IntIdBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"IntIdBrowserCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdBrowserCards"} />
      </MenuItem>

      <MenuItem screenId={"IntIdBrowserList"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdBrowserList"} />
      </MenuItem>

      <MenuItem screenId={"IntIdentityIdBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdentityIdBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"IntIdentityIdBrowserCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdentityIdBrowserCards"} />
      </MenuItem>

      <MenuItem screenId={"IntIdentityIdBrowserList"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdentityIdBrowserList"} />
      </MenuItem>

      <MenuItem screenId={"StringIdCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdCards"} />
      </MenuItem>

      <MenuItem screenId={"StringIdBrowserCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdBrowserCards"} />
      </MenuItem>

      <MenuItem screenId={"StringIdBrowserList"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdBrowserList"} />
      </MenuItem>

      <MenuItem screenId={"StringIdBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"WeirdStringIdBrowserCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.WeirdStringIdBrowserCards"} />
      </MenuItem>

      <MenuItem screenId={"WeirdStringIdBrowserList"}>
        <BarsOutlined />
        <FormattedMessage id={"router.WeirdStringIdBrowserList"} />
      </MenuItem>

      <MenuItem screenId={"WeirdStringIdBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.WeirdStringIdBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"BoringStringIdBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.BoringStringIdBrowserTable"} />
      </MenuItem>

      <MenuItem screenId={"TrickyIdBrowserTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.TrickyIdBrowserTable"} />
      </MenuItem>
    </VerticalMenu>
  );
};

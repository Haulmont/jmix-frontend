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

      <MenuItem screenId={"FavoriteCars"}>
        <BarsOutlined />
        <FormattedMessage id={"router.FavoriteCars"} />
      </MenuItem>

      <MenuItem screenId={"CarManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarManagement"} />
      </MenuItem>

      <MenuItem screenId={"CarManagement2"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarManagement2"} />
      </MenuItem>

      <MenuItem screenId={"CarManagement3"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarManagement3"} />
      </MenuItem>

      <MenuItem screenId={"CarCardsGrid"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CarCardsGrid"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesManagement1"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesManagement1"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesManagement2"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesManagement2"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesManagement3"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesManagement3"} />
      </MenuItem>

      <MenuItem screenId={"AssociationO2OManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationO2OManagement"} />
      </MenuItem>

      <MenuItem screenId={"AssociationO2MManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationO2MManagement"} />
      </MenuItem>

      <MenuItem screenId={"AssociationM2OManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationM2OManagement"} />
      </MenuItem>

      <MenuItem screenId={"AssociationM2MManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.AssociationM2MManagement"} />
      </MenuItem>

      <MenuItem screenId={"CompositionO2OManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CompositionO2OManagement"} />
      </MenuItem>

      <MenuItem screenId={"CompositionO2MManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.CompositionO2MManagement"} />
      </MenuItem>

      <MenuItem screenId={"Datatypes2Management"}>
        <BarsOutlined />
        <FormattedMessage id={"router.Datatypes2Management"} />
      </MenuItem>

      <MenuItem screenId={"Datatypes3Management"}>
        <BarsOutlined />
        <FormattedMessage id={"router.Datatypes3Management"} />
      </MenuItem>

      <MenuItem screenId={"DatatypesCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.DatatypesCards"} />
      </MenuItem>

      <MenuItem screenId={"IntIdentityIdCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdentityIdCards"} />
      </MenuItem>

      <MenuItem screenId={"IntIdManagementTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdManagementTable"} />
      </MenuItem>

      <MenuItem screenId={"IntIdManagementCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdManagementCards"} />
      </MenuItem>

      <MenuItem screenId={"IntIdManagementList"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdManagementList"} />
      </MenuItem>

      <MenuItem screenId={"IntIdentityIdMgtTableManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdentityIdMgtTableManagement"} />
      </MenuItem>

      <MenuItem screenId={"IntIdentityIdMgtCardsManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdentityIdMgtCardsManagement"} />
      </MenuItem>

      <MenuItem screenId={"IntIdentityIdMgtListManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.IntIdentityIdMgtListManagement"} />
      </MenuItem>

      <MenuItem screenId={"StringIdCards"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdCards"} />
      </MenuItem>

      <MenuItem screenId={"StringIdMgtCardsManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdMgtCardsManagement"} />
      </MenuItem>

      <MenuItem screenId={"StringIdMgtListManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdMgtListManagement"} />
      </MenuItem>

      <MenuItem screenId={"StringIdMgtTableManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.StringIdMgtTableManagement"} />
      </MenuItem>

      <MenuItem screenId={"WeirdStringIdMgtCardsManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.WeirdStringIdMgtCardsManagement"} />
      </MenuItem>

      <MenuItem screenId={"WeirdStringIdMgtListManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.WeirdStringIdMgtListManagement"} />
      </MenuItem>

      <MenuItem screenId={"WeirdStringIdMgtTableManagement"}>
        <BarsOutlined />
        <FormattedMessage id={"router.WeirdStringIdMgtTableManagement"} />
      </MenuItem>

      <MenuItem screenId={"BoringStringIdManagementTable"}>
        <BarsOutlined />
        <FormattedMessage id={"router.BoringStringIdManagementTable"} />
      </MenuItem>

      <MenuItem screenId={"TrickyIdMgr"}>
        <BarsOutlined />
        <FormattedMessage id={"router.TrickyIdMgr"} />
      </MenuItem>
    </VerticalMenu>
  );
};

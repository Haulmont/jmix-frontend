import React from "react";
import { VerticalMenu, MenuItem, SubMenuItem } from "@haulmont/jmix-react-ui";
import { BarsOutlined, HomeOutlined } from "@ant-design/icons";
import { tabs } from "@haulmont/jmix-react-core";
import { FormattedMessage } from "react-intl";

export const AppMenu = () => {
  return (
    <VerticalMenu>
      <MenuItem
        onClick={tabs.closeAll}
        icon={<HomeOutlined />}
        caption={<FormattedMessage id="router.home" />}
        key={"home"}
      />

      <MenuItem
        screenId={"TestBlankComponent"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.TestBlankComponent"} />}
        key={"422dd377-0ef2-4cbd-924d-21915cc11407"}
      />

      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StructureComponent"} />}
        key={"dfd2453c-7a1d-4434-8749-390758b42692"}
      />

      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserCards"} />}
        key={"fe417299-1fea-471e-b1e8-9efabec1898e"}
      />

      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserList"} />}
        key={"1d2c017e-5609-4b41-aa77-63a963ecc95b"}
      />

      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserTable"} />}
        key={"c895dc58-cdb1-4fc0-a2a8-05219d3d56bd"}
      />

      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarCardsGrid"} />}
        key={"b3ad0f1f-2530-4e03-9e9f-3892f52b1e82"}
      />

      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.FavoriteCars"} />}
        key={"860e9cda-50db-4aee-b556-78fa32386291"}
      />

      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserCards"} />}
        key={"19008d28-c980-466f-b8dd-8238d7145173"}
      />

      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserList"} />}
        key={"55b12502-d722-4591-8d13-c339de576b5f"}
      />

      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserTable"} />}
        key={"e8337926-85d9-43d2-885b-848ed15303d8"}
      />

      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestCards"} />}
        key={"13b62c21-7e2e-420c-ad03-32b64e7250fc"}
      />

      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2OBrowserTable"} />}
        key={"488c7ef8-a336-4166-b4e8-305264026d83"}
      />

      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2MBrowserTable"} />}
        key={"8de428a3-c649-4d2c-a4f7-0d17ef57b23a"}
      />

      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2OBrowserTable"} />}
        key={"f4e2acf3-2ffe-4199-b858-c878f01e4e49"}
      />

      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2MBrowserTable"} />}
        key={"88e30ff7-9ec2-402d-8bdb-4de700c15ecd"}
      />

      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2OBrowserTable"} />}
        key={"b57a04bc-4989-43df-a2df-86545d5f184f"}
      />

      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2MBrowserTable"} />}
        key={"b3e60863-e1f1-4116-b0b6-35dc046c1686"}
      />

      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserTable"} />}
        key={"2820a187-b4bf-4045-8e30-f0e32a826bb8"}
      />

      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserCards"} />}
        key={"7507ef03-381c-4d8c-949a-efc0294b29b1"}
      />

      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserList"} />}
        key={"2d1eef7d-3106-49f4-82d5-d2d8b3304d1c"}
      />

      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserTable"} />}
        key={"f1382cb4-0c7e-4ed2-8993-386939712b11"}
      />

      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserCards"} />}
        key={"c9725655-0f96-45a8-80e2-2423b90cfe69"}
      />

      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserList"} />}
        key={"772006d8-e3b7-43b2-889e-8a6e6482dbea"}
      />

      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdCards"} />}
        key={"890d1e30-05ad-4ddd-8cec-5eb5bca96a6c"}
      />

      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserCards"} />}
        key={"92518704-93d7-48be-8160-963fdfaa6051"}
      />

      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserList"} />}
        key={"5fdb49c7-e6df-48b1-8fd6-e05d37396f41"}
      />

      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserTable"} />}
        key={"8fe2de19-2872-4d72-a2fd-5a150d82ee1e"}
      />

      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserCards"} />}
        key={"e455a5fe-0ba8-4418-8ca1-d0e14692ba5a"}
      />

      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserList"} />}
        key={"8a6c615b-5f36-4f88-bd35-eacd8e731e6a"}
      />

      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserTable"} />}
        key={"22e5cf57-963a-4402-80d0-702d06be9832"}
      />

      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.BoringStringIdBrowserTable"} />}
        key={"15c46c4d-cd8e-4369-89de-d777adcac0dc"}
      />

      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.TrickyIdBrowserTable"} />}
        key={"2c55f83d-7ae7-489a-a30a-b71f06001948"}
      />
    </VerticalMenu>
  );
};

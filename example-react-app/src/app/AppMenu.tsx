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
        key={"84f94769-de55-4ae5-b2cd-9e0104f31f0f"}
      />

      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StructureComponent"} />}
        key={"10872c7e-1b0f-4851-8227-8b1047fad7cd"}
      />

      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserCards"} />}
        key={"6d3073eb-4c50-484b-91eb-7a1befddc45f"}
      />

      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserList"} />}
        key={"09021c80-859e-4007-a104-c4fe704b27b7"}
      />

      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarBrowserTable"} />}
        key={"9ea7015f-8596-42ff-94dd-5c7b88468edf"}
      />

      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CarCardsGrid"} />}
        key={"c52f08d6-76ce-4599-9529-adc69df864fa"}
      />

      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.FavoriteCars"} />}
        key={"5d6f7bba-a319-4e03-96dd-7294adb060aa"}
      />

      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserCards"} />}
        key={"8bb81b65-8b1d-4f12-be6b-57e4ae4d4c68"}
      />

      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserList"} />}
        key={"4f9a3db7-d027-4966-9b0f-019b50cb4d0a"}
      />

      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestBrowserTable"} />}
        key={"7afd4cc1-7119-4711-b117-dac00caaf5b0"}
      />

      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.DatatypesTestCards"} />}
        key={"0ce06603-1c08-4fc8-a4a7-d82d77b4eadb"}
      />

      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2OBrowserTable"} />}
        key={"b2bd984b-0ba7-4024-b388-de5f0cb8cbe2"}
      />

      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationO2MBrowserTable"} />}
        key={"b3ebfccd-8025-4e1b-b9d7-0af0d6f99fa0"}
      />

      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2OBrowserTable"} />}
        key={"910d9315-9499-489a-ad02-a3a690da4824"}
      />

      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.AssociationM2MBrowserTable"} />}
        key={"52bc2705-4248-4355-8902-d47143dc566c"}
      />

      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2OBrowserTable"} />}
        key={"6506b2c8-daff-403d-9329-7afa7acd5849"}
      />

      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.CompositionO2MBrowserTable"} />}
        key={"f826ee5f-8c16-47e7-b94e-34569eda5e52"}
      />

      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserTable"} />}
        key={"2af29b0c-afdc-4e58-a964-cc3f21153b1a"}
      />

      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserCards"} />}
        key={"c1831daa-5fb4-4ecc-acb1-f7da26f1b07d"}
      />

      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdBrowserList"} />}
        key={"6bab79f0-b633-41b9-a916-7c20f6b166c9"}
      />

      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserTable"} />}
        key={"bdfb9d22-68fb-4ac1-8588-f899c814dd1f"}
      />

      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserCards"} />}
        key={"dd7becf5-d5e0-4218-8739-56fba0613f3e"}
      />

      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.IntIdentityIdBrowserList"} />}
        key={"6675cf5d-9e64-49cb-bee9-7578b42d4f32"}
      />

      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdCards"} />}
        key={"3e020c8c-d4e8-47d9-9b5e-1d5155491dc5"}
      />

      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserCards"} />}
        key={"467c9f1d-479b-40cc-9a26-6ae3c843c627"}
      />

      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserList"} />}
        key={"08734513-ce0f-414d-b907-ea8fe0a0f5f2"}
      />

      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.StringIdBrowserTable"} />}
        key={"00f1405d-a69e-49ab-b4db-70f06a032997"}
      />

      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserCards"} />}
        key={"f4336521-f094-42e8-93d9-d10380fdf03c"}
      />

      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserList"} />}
        key={"151a68e1-9764-4413-92e3-35c404d87ad8"}
      />

      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.WeirdStringIdBrowserTable"} />}
        key={"615895f3-3916-4960-a141-5e8ade21f780"}
      />

      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.BoringStringIdBrowserTable"} />}
        key={"f87267c7-b634-48dc-8359-7ea90b6462f2"}
      />

      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={<FormattedMessage id={"router.TrickyIdBrowserTable"} />}
        key={"18ade3d3-1ad3-4c93-9434-997ced031920"}
      />
    </VerticalMenu>
  );
};

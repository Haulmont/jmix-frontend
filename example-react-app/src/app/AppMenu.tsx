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
        caption={"router.home"}
        key={"home"}
      />
      <MenuItem
        screenId={"TestBlankComponent"}
        icon={<BarsOutlined />}
        caption={"router.TestBlankComponent"}
        key={"5a32ab5e-80e5-43ab-9679-63bbed8d67ce"}
      />
      <MenuItem
        screenId={"StructureComponent"}
        icon={<BarsOutlined />}
        caption={"router.StructureComponent"}
        key={"2fdcb1af-14bf-4f3f-8019-f31a16ff00e7"}
      />
      <MenuItem
        screenId={"CarBrowserCards"}
        icon={<BarsOutlined />}
        caption={"router.CarBrowserCards"}
        key={"6a3830eb-36f0-4445-8961-5349fe005406"}
      />
      <MenuItem
        screenId={"CarBrowserList"}
        icon={<BarsOutlined />}
        caption={"router.CarBrowserList"}
        key={"65469d5e-fb6d-4f19-b395-7698ea89367f"}
      />
      <MenuItem
        screenId={"CarBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.CarBrowserTable"}
        key={"d59620a9-aa21-4a60-aa49-a17ac81f5ac7"}
      />
      <MenuItem
        screenId={"CarCardsGrid"}
        icon={<BarsOutlined />}
        caption={"router.CarCardsGrid"}
        key={"3b141d58-9b32-44a5-824e-290c56156708"}
      />
      <MenuItem
        screenId={"FavoriteCars"}
        icon={<BarsOutlined />}
        caption={"router.FavoriteCars"}
        key={"ecd6508c-b7ff-4f1c-b86a-62d3729056be"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserCards"}
        icon={<BarsOutlined />}
        caption={"router.DatatypesTestBrowserCards"}
        key={"69173232-31f2-40f3-a224-1c6a5039ea50"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserList"}
        icon={<BarsOutlined />}
        caption={"router.DatatypesTestBrowserList"}
        key={"027268cd-9e4b-46e7-a932-54bdbd3b879f"}
      />
      <MenuItem
        screenId={"DatatypesTestBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.DatatypesTestBrowserTable"}
        key={"83287996-6884-4cb5-a44a-99056027e387"}
      />
      <MenuItem
        screenId={"DatatypesTestCards"}
        icon={<BarsOutlined />}
        caption={"router.DatatypesTestCards"}
        key={"50236e36-459d-47ce-bf8c-95c773c7b80d"}
      />
      <MenuItem
        screenId={"AssociationO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.AssociationO2OBrowserTable"}
        key={"a62fea87-3ced-4e6f-9b6e-5b9e405b9509"}
      />
      <MenuItem
        screenId={"AssociationO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.AssociationO2MBrowserTable"}
        key={"24bd622f-45c3-4e14-8ee3-23c1650f78ce"}
      />
      <MenuItem
        screenId={"AssociationM2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.AssociationM2OBrowserTable"}
        key={"1d83ed97-acda-41aa-83d6-b2eab3d54fdc"}
      />
      <MenuItem
        screenId={"AssociationM2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.AssociationM2MBrowserTable"}
        key={"7f80009b-43e5-4f8f-ad28-c30a9b392cad"}
      />
      <MenuItem
        screenId={"CompositionO2OBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.CompositionO2OBrowserTable"}
        key={"d16b9180-31a1-4841-b3bb-4f8cdaa08c66"}
      />
      <MenuItem
        screenId={"CompositionO2MBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.CompositionO2MBrowserTable"}
        key={"303456d0-fd5d-4993-b945-931869c7b9c5"}
      />
      <MenuItem
        screenId={"DeeplyNestedO2MTestEntityTable"}
        icon={<BarsOutlined />}
        caption={"router.DeeplyNestedO2MTestEntityTable"}
        key={"d84ad58c-be2b-466c-b288-a468cf1c9ac6"}
      />
      <MenuItem
        screenId={"IntIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.IntIdBrowserTable"}
        key={"5e8d543e-0e9e-4e97-a1f6-d13557a6206a"}
      />
      <MenuItem
        screenId={"IntIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"router.IntIdBrowserCards"}
        key={"79d817c7-5d67-47fb-b082-bb0022d27e13"}
      />
      <MenuItem
        screenId={"IntIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"router.IntIdBrowserList"}
        key={"210cc126-c761-4403-906b-8a8d40847fc2"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.IntIdentityIdBrowserTable"}
        key={"a7749ca7-0771-437a-896c-422243f98622"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"router.IntIdentityIdBrowserCards"}
        key={"f7eee816-6667-42ff-b77a-4236545f504d"}
      />
      <MenuItem
        screenId={"IntIdentityIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"router.IntIdentityIdBrowserList"}
        key={"83df17ec-b805-420c-b9de-280842bdd19e"}
      />
      <MenuItem
        screenId={"StringIdCards"}
        icon={<BarsOutlined />}
        caption={"router.StringIdCards"}
        key={"89bca612-644f-4133-b3dd-571d203007b8"}
      />
      <MenuItem
        screenId={"StringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"router.StringIdBrowserCards"}
        key={"c36949d1-43f1-4edb-81d3-3ae333303a34"}
      />
      <MenuItem
        screenId={"StringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"router.StringIdBrowserList"}
        key={"97376af9-8e64-453a-a548-36b9b8447ce6"}
      />
      <MenuItem
        screenId={"StringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.StringIdBrowserTable"}
        key={"4c3e95a8-ae4c-4805-a043-d06a88981af4"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserCards"}
        icon={<BarsOutlined />}
        caption={"router.WeirdStringIdBrowserCards"}
        key={"8d103a1a-2b96-4d3c-a898-04a3db4e29d6"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserList"}
        icon={<BarsOutlined />}
        caption={"router.WeirdStringIdBrowserList"}
        key={"b1d075f8-595a-4da6-9ebb-192b5a7bf1ae"}
      />
      <MenuItem
        screenId={"WeirdStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.WeirdStringIdBrowserTable"}
        key={"03a49b26-b621-4964-8acd-3eca24ab9b31"}
      />
      <MenuItem
        screenId={"BoringStringIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.BoringStringIdBrowserTable"}
        key={"385e1004-ebfe-49f7-954f-7a91868c50aa"}
      />
      <MenuItem
        screenId={"TrickyIdBrowserTable"}
        icon={<BarsOutlined />}
        caption={"router.TrickyIdBrowserTable"}
        key={"e660a1ad-c093-4c64-b44c-b02413c3f664"}
      />
    </VerticalMenu>
  );
};

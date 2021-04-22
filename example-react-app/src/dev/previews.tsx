import TrickyIdList from "../app/tricky-id/TrickyIdList";
import TrickyIdEdit from "../app/tricky-id/TrickyIdEdit";
import BoringStringIdMgtTableBrowse from "../app/boring-string-id-management-table/BoringStringIdMgtTableBrowse";
import BoringStringIdMgtTableEdit from "../app/boring-string-id-management-table/BoringStringIdMgtTableEdit";
import WeirdStringIdMgtTableBrowse from "../app/weird-string-id-management-table/WeirdStringIdMgtTableBrowse";
import WeirdStringIdMgtTableEdit from "../app/weird-string-id-management-table/WeirdStringIdMgtTableEdit";
import WeirdStringIdMgtListBrowse from "../app/weird-string-id-management-list/WeirdStringIdMgtListBrowse";
import WeirdStringIdMgtListEdit from "../app/weird-string-id-management-list/WeirdStringIdMgtListEdit";
import WeirdStringIdMgtCardsBrowse from "../app/weird-string-id-management-cards/WeirdStringIdMgtCardsBrowse";
import WeirdStringIdMgtCardsEdit from "../app/weird-string-id-management-cards/WeirdStringIdMgtCardsEdit";
import StringIdMgtTableBrowse from "../app/string-id-management-table/StringIdMgtTableBrowse";
import StringIdMgtTableEdit from "../app/string-id-management-table/StringIdMgtTableEdit";
import StringIdMgtListBrowse from "../app/string-id-management-list/StringIdMgtListBrowse";
import StringIdMgtListEdit from "../app/string-id-management-list/StringIdMgtListEdit";
import StringIdMgtCardsBrowse from "../app/string-id-management-cards/StringIdMgtCardsBrowse";
import StringIdMgtCardsEdit from "../app/string-id-management-cards/StringIdMgtCardsEdit";
import { StringIdCards } from "../app/string-id-cards/StringIdCards";
import IntIdentityIdMgtListBrowse from "../app/int-identity-id-management-list/IntIdentityIdMgtListBrowse";
import IntIdentityIdMgtListEdit from "../app/int-identity-id-management-list/IntIdentityIdMgtListEdit";
import IntIdentityIdMgtCardsBrowse from "../app/int-identity-id-management-cards/IntIdentityIdMgtCardsBrowse";
import IntIdentityIdMgtCardsEdit from "../app/int-identity-id-management-cards/IntIdentityIdMgtCardsEdit";
import IntIdentityIdMgtTableBrowse from "../app/int-identity-id-management-table/IntIdentityIdMgtTableBrowse";
import IntIdentityIdMgtTableEdit from "../app/int-identity-id-management-table/IntIdentityIdMgtTableEdit";
import IntIdMgtListBrowse from "../app/int-id-management-list/IntIdMgtListBrowse";
import IntIdMgtListEdit from "../app/int-id-management-list/IntIdMgtListEdit";
import IntIdMgtCardsBrowse from "../app/int-id-management-cards/IntIdMgtCardsBrowse";
import IntIdMgtCardsEdit from "../app/int-id-management-cards/IntIdMgtCardsEdit";
import IntIdMgtTableBrowse from "../app/int-id-management-table/IntIdMgtTableBrowse";
import IntIdMgtTableEdit from "../app/int-id-management-table/IntIdMgtTableEdit";
import { IntIdentityIdCards } from "../app/int-id-cards/IntIdentityIdCards";
import { DatatypesCards } from "../app/datatypes-test-cards/DatatypesCards";
import Datatypes3Browse from "../app/datatypes3/Datatypes3Browse";
import Datatypes3Edit from "../app/datatypes3/Datatypes3Edit";
import Datatypes2Browse from "../app/datatypes2/Datatypes2Browse";
import Datatypes2Edit from "../app/datatypes2/Datatypes2Edit";
import CompositionO2MBrowse from "../app/compositionO2M/CompositionO2MBrowse";
import CompositionO2MEdit from "../app/compositionO2M/CompositionO2MEdit";
import CompositionO2OBrowse from "../app/compositionO2O/CompositionO2OBrowse";
import CompositionO2OEdit from "../app/compositionO2O/CompositionO2OEdit";
import AssociationM2MBrowse from "../app/associationM2M/AssociationM2MBrowse";
import AssociationM2MEdit from "../app/associationM2M/AssociationM2MEdit";
import AssociationM2OBrowse from "../app/associationM2O/AssociationM2OBrowse";
import AssociationM2OEdit from "../app/associationM2O/AssociationM2OEdit";
import AssociationO2MBrowse from "../app/associationO2M/AssociationO2MBrowse";
import AssociationO2MEdit from "../app/associationO2M/AssociationO2MEdit";
import AssociationO2OBrowse from "../app/associationO2O/AssociationO2OBrowse";
import AssociationO2OEdit from "../app/associationO2O/AssociationO2OEdit";
import GraphQLCardsBrowser from "../app/graphql-cards/GraphQLCardsBrowser";
import GraphQLCardsEdit from "../app/graphql-cards/GraphQLCardsEdit";
import GraphQLList from "../app/graphql/GraphQLList";
import GraphQLEdit from "../app/graphql/GraphQLEdit";
import HooksPOCList from "../app/hooks-poc/HooksPOCList";
import HooksPOCEdit from "../app/hooks-poc/HooksPOCEdit";
import DatatypesBrowse3 from "../app/datatypes-test3/DatatypesBrowse3";
import DatatypesEdit3 from "../app/datatypes-test3/DatatypesEdit3";
import DatatypesBrowse2 from "../app/datatypes-test2/DatatypesBrowse2";
import DatatypesEdit2 from "../app/datatypes-test2/DatatypesEdit2";
import DatatypesBrowse1 from "../app/datatypes-test1/DatatypesBrowse1";
import DatatypesEdit1 from "../app/datatypes-test1/DatatypesEdit1";
import CarTable from "../app/entity-management3/CarTable";
import CarEdit3 from "../app/entity-management3/CarEdit3";
import CarList from "../app/entity-management2/CarList";
import CarEdit2 from "../app/entity-management2/CarEdit2";
import CarCards from "../app/entity-management/CarCards";
import CarEdit from "../app/entity-management/CarEdit";
import { FavoriteCars } from "../app/entity-cards/FavoriteCars";
import { TestBlankComponent } from "../app/blank-components/TestBlankComponent";
import React from "react";
import { Previews, ComponentPreview } from "@haulmont/react-ide-toolbox";

export const ComponentPreviews: React.FC = () => {
  return (
    <Previews>
      <ComponentPreview path="/testBlankComponent">
        <TestBlankComponent />
      </ComponentPreview>

      <ComponentPreview path="/favoriteCars">
        <FavoriteCars />
      </ComponentPreview>

      <ComponentPreview path="/CarEdit">
        <CarEdit />
      </ComponentPreview>

      <ComponentPreview path="/CarCards">
        <CarCards />
      </ComponentPreview>

      <ComponentPreview path="/CarEdit2">
        <CarEdit2 />
      </ComponentPreview>

      <ComponentPreview path="/CarList">
        <CarList />
      </ComponentPreview>

      <ComponentPreview path="/CarEdit3">
        <CarEdit3 />
      </ComponentPreview>

      <ComponentPreview path="/CarTable">
        <CarTable />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesEdit1">
        <DatatypesEdit1 />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesBrowse1">
        <DatatypesBrowse1 />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesEdit2">
        <DatatypesEdit2 />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesBrowse2">
        <DatatypesBrowse2 />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesEdit3">
        <DatatypesEdit3 />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesBrowse3">
        <DatatypesBrowse3 />
      </ComponentPreview>

      <ComponentPreview path="/HooksPOCEdit">
        <HooksPOCEdit entityId={"new"} />
      </ComponentPreview>

      <ComponentPreview path="/HooksPOCList">
        <HooksPOCList />
      </ComponentPreview>

      <ComponentPreview path="/GraphQLEdit">
        <GraphQLEdit />
      </ComponentPreview>

      <ComponentPreview path="/GraphQLList">
        <GraphQLList />
      </ComponentPreview>

      <ComponentPreview path="/GraphQLCardsEdit">
        <GraphQLCardsEdit />
      </ComponentPreview>

      <ComponentPreview path="/GraphQLCardsBrowser">
        <GraphQLCardsBrowser />
      </ComponentPreview>

      <ComponentPreview path="/AssociationO2OEdit">
        <AssociationO2OEdit />
      </ComponentPreview>

      <ComponentPreview path="/AssociationO2OBrowse">
        <AssociationO2OBrowse />
      </ComponentPreview>

      <ComponentPreview path="/AssociationO2MEdit">
        <AssociationO2MEdit />
      </ComponentPreview>

      <ComponentPreview path="/AssociationO2MBrowse">
        <AssociationO2MBrowse />
      </ComponentPreview>

      <ComponentPreview path="/AssociationM2OEdit">
        <AssociationM2OEdit />
      </ComponentPreview>

      <ComponentPreview path="/AssociationM2OBrowse">
        <AssociationM2OBrowse />
      </ComponentPreview>

      <ComponentPreview path="/AssociationM2MEdit">
        <AssociationM2MEdit />
      </ComponentPreview>

      <ComponentPreview path="/AssociationM2MBrowse">
        <AssociationM2MBrowse />
      </ComponentPreview>

      <ComponentPreview path="/CompositionO2OEdit">
        <CompositionO2OEdit />
      </ComponentPreview>

      <ComponentPreview path="/CompositionO2OBrowse">
        <CompositionO2OBrowse />
      </ComponentPreview>

      <ComponentPreview path="/CompositionO2MEdit">
        <CompositionO2MEdit />
      </ComponentPreview>

      <ComponentPreview path="/CompositionO2MBrowse">
        <CompositionO2MBrowse />
      </ComponentPreview>

      <ComponentPreview path="/Datatypes2Edit">
        <Datatypes2Edit />
      </ComponentPreview>

      <ComponentPreview path="/Datatypes2Browse">
        <Datatypes2Browse />
      </ComponentPreview>

      <ComponentPreview path="/Datatypes3Edit">
        <Datatypes3Edit />
      </ComponentPreview>

      <ComponentPreview path="/Datatypes3Browse">
        <Datatypes3Browse />
      </ComponentPreview>

      <ComponentPreview path="/datatypesCards">
        <DatatypesCards />
      </ComponentPreview>

      <ComponentPreview path="/intIdentityIdCards">
        <IntIdentityIdCards />
      </ComponentPreview>

      <ComponentPreview path="/IntIdMgtTableEdit">
        <IntIdMgtTableEdit />
      </ComponentPreview>

      <ComponentPreview path="/IntIdMgtTableBrowse">
        <IntIdMgtTableBrowse />
      </ComponentPreview>

      <ComponentPreview path="/IntIdMgtCardsEdit">
        <IntIdMgtCardsEdit />
      </ComponentPreview>

      <ComponentPreview path="/IntIdMgtCardsBrowse">
        <IntIdMgtCardsBrowse />
      </ComponentPreview>

      <ComponentPreview path="/IntIdMgtListEdit">
        <IntIdMgtListEdit />
      </ComponentPreview>

      <ComponentPreview path="/IntIdMgtListBrowse">
        <IntIdMgtListBrowse />
      </ComponentPreview>

      <ComponentPreview path="/IntIdentityIdMgtTableEdit">
        <IntIdentityIdMgtTableEdit />
      </ComponentPreview>

      <ComponentPreview path="/IntIdentityIdMgtTableBrowse">
        <IntIdentityIdMgtTableBrowse />
      </ComponentPreview>

      <ComponentPreview path="/IntIdentityIdMgtCardsEdit">
        <IntIdentityIdMgtCardsEdit />
      </ComponentPreview>

      <ComponentPreview path="/IntIdentityIdMgtCardsBrowse">
        <IntIdentityIdMgtCardsBrowse />
      </ComponentPreview>

      <ComponentPreview path="/IntIdentityIdMgtListEdit">
        <IntIdentityIdMgtListEdit />
      </ComponentPreview>

      <ComponentPreview path="/IntIdentityIdMgtListBrowse">
        <IntIdentityIdMgtListBrowse />
      </ComponentPreview>

      <ComponentPreview path="/stringIdCards">
        <StringIdCards />
      </ComponentPreview>

      <ComponentPreview path="/StringIdMgtCardsEdit">
        <StringIdMgtCardsEdit />
      </ComponentPreview>

      <ComponentPreview path="/StringIdMgtCardsBrowse">
        <StringIdMgtCardsBrowse />
      </ComponentPreview>

      <ComponentPreview path="/StringIdMgtListEdit">
        <StringIdMgtListEdit />
      </ComponentPreview>

      <ComponentPreview path="/StringIdMgtListBrowse">
        <StringIdMgtListBrowse />
      </ComponentPreview>

      <ComponentPreview path="/StringIdMgtTableEdit">
        <StringIdMgtTableEdit />
      </ComponentPreview>

      <ComponentPreview path="/StringIdMgtTableBrowse">
        <StringIdMgtTableBrowse />
      </ComponentPreview>

      <ComponentPreview path="/WeirdStringIdMgtCardsEdit">
        <WeirdStringIdMgtCardsEdit />
      </ComponentPreview>

      <ComponentPreview path="/WeirdStringIdMgtCardsBrowse">
        <WeirdStringIdMgtCardsBrowse />
      </ComponentPreview>

      <ComponentPreview path="/WeirdStringIdMgtListEdit">
        <WeirdStringIdMgtListEdit />
      </ComponentPreview>

      <ComponentPreview path="/WeirdStringIdMgtListBrowse">
        <WeirdStringIdMgtListBrowse />
      </ComponentPreview>

      <ComponentPreview path="/WeirdStringIdMgtTableEdit">
        <WeirdStringIdMgtTableEdit />
      </ComponentPreview>

      <ComponentPreview path="/WeirdStringIdMgtTableBrowse">
        <WeirdStringIdMgtTableBrowse />
      </ComponentPreview>

      <ComponentPreview path="/BoringStringIdMgtTableEdit">
        <BoringStringIdMgtTableEdit />
      </ComponentPreview>

      <ComponentPreview path="/BoringStringIdMgtTableBrowse">
        <BoringStringIdMgtTableBrowse />
      </ComponentPreview>

      <ComponentPreview path="/TrickyIdEdit">
        <TrickyIdEdit />
      </ComponentPreview>

      <ComponentPreview path="/TrickyIdList">
        <TrickyIdList />
      </ComponentPreview>
    </Previews>
  );
};

import React from "react";
import TrickyIdBrowserTable from "../app/tricky-id-browser-table/TrickyIdBrowserTable";
import TrickyIdEditor from "../app/tricky-id-editor/TrickyIdEditor";
import BoringStringIdBrowserTable from "../app/boring-string-id-browser-table/BoringStringIdBrowserTable";
import BoringStringIdEditor from "../app/boring-string-id-editor/BoringStringIdEditor";
import WeirdStringIdBrowserTable from "../app/weird-string-id-browser-table/WeirdStringIdBrowserTable";
import WeirdStringIdBrowserList from "../app/weird-string-id-browser-list/WeirdStringIdBrowserList";
import WeirdStringIdBrowserCards from "../app/weird-string-id-browser-cards/WeirdStringIdBrowserCards";
import WeirdStringIdEditor from "../app/weird-string-id-editor/WeirdStringIdEditor";
import StringIdBrowserTable from "../app/string-id-browser-table/StringIdBrowserTable";
import StringIdBrowserList from "../app/string-id-browser-list/StringIdBrowserList";
import StringIdBrowserCards from "../app/string-id-browser-cards/StringIdBrowserCards";
import StringIdMgtCardsEdit from "../app/string-id-editor/StringIdMgtCardsEdit";
import { StringIdCards } from "../app/string-id-cards/StringIdCards";
import IntIdentityIdBrowserList from "../app/int-identity-id-browser-list/IntIdentityIdBrowserList";
import IntIdentityIdBrowserCards from "../app/int-identity-id-browser-cards/IntIdentityIdBrowserCards";
import IntIdentityIdBrowserTable from "../app/int-identity-id-browser-table/IntIdentityIdBrowserTable";
import IntIdentityIdEditor from "../app/int-identity-id-editer/IntIdentityIdEditor";
import { IntIdentityIdCards } from "../app/int-id-cards/IntIdentityIdCards";
import IntIdBrowserList from "../app/int-id-browser-list/IntIdBrowserList";
import IntIdBrowserCards from "../app/int-id-browser-cards/IntIdBrowserCards";
import IntIdBrowserTable from "../app/int-id-browser-table/IntIdBrowserTable";
import IntIdEditor from "../app/int-id-editor/IntIdEditor";
import DeeplyNestedO2MTestEntityEditor from "../app/deeplyNestedO2M-editor/DeeplyNestedO2MTestEntityEditor";
import DeeplyNestedO2MTestEntityTable from "../app/deeplyNestedO2M-browser/DeeplyNestedO2MTestEntityTable";
import DeeplyNestedTestEntityEditor from "../app/deeplyNestedO2O-editor/DeeplyNestedTestEntityEditor";
import CompositionO2MBrowserTable from "../app/compositionO2M-management/CompositionO2MBrowserTable";
import CompositionO2MEditor from "../app/compositionO2M-management/CompositionO2MEditor";
import CompositionO2OBrowserTable from "../app/compositionO2O-management/CompositionO2OBrowserTable";
import CompositionO2OEditor from "../app/compositionO2O-management/CompositionO2OEditor";
import AssociationM2MBrowserTable from "../app/associationM2M-management/AssociationM2MBrowserTable";
import AssociationM2MEditor from "../app/associationM2M-management/AssociationM2MEditor";
import AssociationM2OBrowserTable from "../app/associationM2O-management/AssociationM2OBrowserTable";
import AssociationM2OEditor from "../app/associationM2O-management/AssociationM2OEditor";
import AssociationO2MBrowserTable from "../app/associationO2M-management/AssociationO2MBrowserTable";
import AssociationO2MEditor from "../app/associationO2M-management/AssociationO2MEditor";
import AssociationO2OBrowserTable from "../app/associationO2O-management/AssociationO2OBrowserTable";
import AssociationO2OEditor from "../app/associationO2O-management/AssociationO2OEditor";
import { DatatypesTestCards } from "../app/datatypes-test-cards/DatatypesTestCards";
import DatatypesTestBrowserTable from "../app/datatypes-test-browser-table/DatatypesTestBrowserTable";
import DatatypesTestBrowserList from "../app/datatypes-test-browser-list/DatatypesTestBrowserList";
import DatatypesTestBrowserCards from "../app/datatypes-test-browser-cards/DatatypesTestBrowserCards";
import DatatypesTestEditor from "../app/datatypes-test-editor/DatatypesTestEditor";
import CarMultiSelectionTable from "../app/car-multi-selection-table/CarMultiSelectionTable";
import FormWizardBrowserTable from "../app/form-wizard-browser/FormWizardBrowserTable";
import FormWizardCompositionO2O from "../app/form-wizard-compositionO2O-editor/FormWizardCompositionO2O";
import CarMasterDetail from "../app/car-master-detail/CarMasterDetail";
import CarCardsWithDetails from "../app/car-cards-with-details/CarCardsWithDetails";
import { FavoriteCars } from "../app/entity-cards/FavoriteCars";
import CarBrowserTable from "../app/car-browser-table/CarBrowserTable";
import CarBrowserList from "../app/car-browser-list/CarBrowserList";
import CarBrowserCards from "../app/car-browser-cards/CarBrowserCards";
import CarEditor from "../app/car-editor/CarEditor";
import { TestBlankScreen } from "../app/blank-screen/TestBlankScreen";
import { ExampleCustomScreen } from "../app/example-custom-screen/ExampleCustomScreen";
import { Previews, ComponentPreview } from "@haulmont/react-ide-toolbox";

export const ComponentPreviews = () => {
  return (
    <Previews>
      <ComponentPreview path="/exampleCustomScreen">
        <ExampleCustomScreen />
      </ComponentPreview>
      <ComponentPreview path="/testBlankScreen">
        <TestBlankScreen />
      </ComponentPreview>
      <ComponentPreview path="/CarEditor">
        <CarEditor />
      </ComponentPreview>
      <ComponentPreview path="/CarBrowserCards">
        <CarBrowserCards />
      </ComponentPreview>
      <ComponentPreview path="/CarBrowserList">
        <CarBrowserList />
      </ComponentPreview>
      <ComponentPreview path="/CarBrowserTable">
        <CarBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/favoriteCars">
        <FavoriteCars />
      </ComponentPreview>
      <ComponentPreview path="/CarCardsWithDetails">
        <CarCardsWithDetails />
      </ComponentPreview>
      <ComponentPreview path="/CarMasterDetail">
        <CarMasterDetail />
      </ComponentPreview>
      <ComponentPreview path="/FormWizardCompositionO2O">
        <FormWizardCompositionO2O />
      </ComponentPreview>
      <ComponentPreview path="/FormWizardBrowserTable">
        <FormWizardBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/CarMultiSelectionTable">
        <CarMultiSelectionTable />
      </ComponentPreview>
      <ComponentPreview path="/DatatypesTestEditor">
        <DatatypesTestEditor />
      </ComponentPreview>
      <ComponentPreview path="/DatatypesTestBrowserCards">
        <DatatypesTestBrowserCards />
      </ComponentPreview>
      <ComponentPreview path="/DatatypesTestBrowserList">
        <DatatypesTestBrowserList />
      </ComponentPreview>
      <ComponentPreview path="/DatatypesTestBrowserTable">
        <DatatypesTestBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/datatypesTestCards">
        <DatatypesTestCards />
      </ComponentPreview>
      <ComponentPreview path="/AssociationO2OEditor">
        <AssociationO2OEditor />
      </ComponentPreview>
      <ComponentPreview path="/AssociationO2OBrowserTable">
        <AssociationO2OBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/AssociationO2MEditor">
        <AssociationO2MEditor />
      </ComponentPreview>
      <ComponentPreview path="/AssociationO2MBrowserTable">
        <AssociationO2MBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/AssociationM2OEditor">
        <AssociationM2OEditor />
      </ComponentPreview>
      <ComponentPreview path="/AssociationM2OBrowserTable">
        <AssociationM2OBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/AssociationM2MEditor">
        <AssociationM2MEditor />
      </ComponentPreview>
      <ComponentPreview path="/AssociationM2MBrowserTable">
        <AssociationM2MBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/CompositionO2OEditor">
        <CompositionO2OEditor />
      </ComponentPreview>
      <ComponentPreview path="/CompositionO2OBrowserTable">
        <CompositionO2OBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/CompositionO2MEditor">
        <CompositionO2MEditor />
      </ComponentPreview>
      <ComponentPreview path="/CompositionO2MBrowserTable">
        <CompositionO2MBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/DeeplyNestedTestEntityEditor">
        <DeeplyNestedTestEntityEditor />
      </ComponentPreview>
      <ComponentPreview path="/DeeplyNestedO2MTestEntityTable">
        <DeeplyNestedO2MTestEntityTable />
      </ComponentPreview>
      <ComponentPreview path="/DeeplyNestedO2MTestEntityEditor">
        <DeeplyNestedO2MTestEntityEditor />
      </ComponentPreview>
      <ComponentPreview path="/IntIdEditor">
        <IntIdEditor />
      </ComponentPreview>
      <ComponentPreview path="/IntIdBrowserTable">
        <IntIdBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/IntIdBrowserCards">
        <IntIdBrowserCards />
      </ComponentPreview>
      <ComponentPreview path="/IntIdBrowserList">
        <IntIdBrowserList />
      </ComponentPreview>
      <ComponentPreview path="/intIdentityIdCards">
        <IntIdentityIdCards />
      </ComponentPreview>
      <ComponentPreview path="/IntIdentityIdEditor">
        <IntIdentityIdEditor />
      </ComponentPreview>
      <ComponentPreview path="/IntIdentityIdBrowserTable">
        <IntIdentityIdBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/IntIdentityIdBrowserCards">
        <IntIdentityIdBrowserCards />
      </ComponentPreview>
      <ComponentPreview path="/IntIdentityIdBrowserList">
        <IntIdentityIdBrowserList />
      </ComponentPreview>
      <ComponentPreview path="/stringIdCards">
        <StringIdCards />
      </ComponentPreview>
      <ComponentPreview path="/StringIdMgtCardsEdit">
        <StringIdMgtCardsEdit />
      </ComponentPreview>
      <ComponentPreview path="/StringIdBrowserCards">
        <StringIdBrowserCards />
      </ComponentPreview>
      <ComponentPreview path="/StringIdBrowserList">
        <StringIdBrowserList />
      </ComponentPreview>
      <ComponentPreview path="/StringIdBrowserTable">
        <StringIdBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/WeirdStringIdEditor">
        <WeirdStringIdEditor />
      </ComponentPreview>
      <ComponentPreview path="/WeirdStringIdBrowserCards">
        <WeirdStringIdBrowserCards />
      </ComponentPreview>
      <ComponentPreview path="/WeirdStringIdBrowserList">
        <WeirdStringIdBrowserList />
      </ComponentPreview>
      <ComponentPreview path="/WeirdStringIdBrowserTable">
        <WeirdStringIdBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/BoringStringIdEditor">
        <BoringStringIdEditor />
      </ComponentPreview>
      <ComponentPreview path="/BoringStringIdBrowserTable">
        <BoringStringIdBrowserTable />
      </ComponentPreview>
      <ComponentPreview path="/TrickyIdEditor">
        <TrickyIdEditor />
      </ComponentPreview>
      <ComponentPreview path="/TrickyIdBrowserTable">
        <TrickyIdBrowserTable />
      </ComponentPreview>
    </Previews>
  );
};

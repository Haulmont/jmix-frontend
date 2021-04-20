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
        <CarEdit entityId={"new"} />
      </ComponentPreview>

      <ComponentPreview path="/CarCards">
        <CarCards paginationConfig={{}} onPagingChange={() => {}} />
      </ComponentPreview>

      <ComponentPreview path="/CarEdit2">
        <CarEdit2 entityId={"new"} />
      </ComponentPreview>

      <ComponentPreview path="/CarList">
        <CarList paginationConfig={{}} onPagingChange={() => {}} />
      </ComponentPreview>

      <ComponentPreview path="/CarEdit3">
        <CarEdit3 entityId={"new"} />
      </ComponentPreview>

      <ComponentPreview path="/CarTable">
        <CarTable />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesEdit1">
        <DatatypesEdit1 entityId={"new"} />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesBrowse1">
        <DatatypesBrowse1 paginationConfig={{}} onPagingChange={() => {}} />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesEdit2">
        <DatatypesEdit2 entityId={"new"} />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesBrowse2">
        <DatatypesBrowse2 paginationConfig={{}} onPagingChange={() => {}} />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesEdit3">
        <DatatypesEdit3 entityId={"new"} />
      </ComponentPreview>

      <ComponentPreview path="/DatatypesBrowse3">
        <DatatypesBrowse3 />
      </ComponentPreview>
    </Previews>
  );
};

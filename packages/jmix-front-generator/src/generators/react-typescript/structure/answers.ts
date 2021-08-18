import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {
  createComponentNameQuestion,
  ComponentNameAnswer,
  menuItemQuestion,
  MenuItemAnswer,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";

export type ColumnLayoutTypes =
  "Two columns"
  | "Two columns with 1:3 proportion"
  | "Two columns with 3:1 proportion"
  | "Four columns";

const columnLayoutTypeOptions: ColumnLayoutTypes[] = [
  "Two columns",
  "Two columns with 1:3 proportion",
  "Two columns with 3:1 proportion",
  "Four columns",
];

interface StructureTypeAnswer {
  structureType: ColumnLayoutTypes;
} 
const structureTypeAnswer: StudioTemplateProperty = {
  caption: 'Select structure type',
  code: 'structureType',
  required: true,
  propertyType: StudioTemplatePropertyType.OPTION,
  options: columnLayoutTypeOptions,
}

export interface StructureAnswers extends
ComponentNameAnswer,
StructureTypeAnswer,
MenuItemAnswer {}

export const StructureQuestions: StudioTemplateProperty[] = [
  createComponentNameQuestion({defaultValue: 'Structure'}),
  structureTypeAnswer,
  menuItemQuestion,
];

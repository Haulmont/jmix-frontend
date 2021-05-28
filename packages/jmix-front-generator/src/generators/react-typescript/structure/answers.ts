import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type ColumnLayoutTypes =
  "Two columns"
  | "Two columns with 1:3 proportion"
  | "Two columns with 3:1 proportion"
  | "Four columns"

const columnLayoutTypeOptions: ColumnLayoutTypes[] = [
  "Two columns",
  "Two columns with 1:3 proportion",
  "Two columns with 3:1 proportion",
  "Four columns",
]

export interface Answers {
    componentName: string,
    structureType: ColumnLayoutTypes,
    menuItem: string | null
}

export const allQuestions: StudioTemplateProperty[] = [
  {
    caption: "Component class name",
    code: "componentName",
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    required: true
  },
  {
    caption: 'Select structure type',
    code: 'structureType',
    required: true,
    propertyType: StudioTemplatePropertyType.OPTION,
    options: columnLayoutTypeOptions,
  },
  {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: true
  },
];

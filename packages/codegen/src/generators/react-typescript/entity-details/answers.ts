import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ScreenAnswers} from "../../../building-blocks/stages/answers/amplicode/ScreenAnswers";

export type MvpEntityEditorAnswers =
  ScreenAnswers & {
    query: string;
    mutation?: string;
    listQueryName: string; // TODO remove
    idField?: string;
  };

export const entityDetailsQuestions = [
  {
    caption: 'Component name',
    code: 'componentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Details',
    required: true
  },
  {
    caption: 'List query name',
    code: 'listQueryName',
    propertyType: StudioTemplatePropertyType.STRING,
    required: true
  },
  {
    caption: 'Query to load item',
    code: 'query',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true
  },
  {
    caption: 'Mutation to create or update item',
    code: 'mutation',
    propertyType: StudioTemplatePropertyType.GRAPHQL_MUTATION,
    required: false
  },
  {
    caption: 'Name of the id attribute',
    code: 'idField',
    propertyType: StudioTemplatePropertyType.STRING,
    required: false
  },
  {
    caption: "Add to menu",
    code: "shouldAddToMenu",
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    required: true
  }
];
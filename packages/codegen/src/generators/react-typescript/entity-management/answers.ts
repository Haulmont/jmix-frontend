import {EntityListMode} from "../entity-list/answers";
import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ScreenAnswers} from "../../../building-blocks/stages/answers/amplicode/ScreenAnswers";

export interface EntityManagementAnswers extends ScreenAnswers {
  listComponentName: string,
  detailsComponentName: string,
  mode?: EntityListMode;
  listQuery: string,
  detailsQuery: string,
  listQueryName: string,
  upsertMutation?: string,
  deleteMutation?: string,
  idField?: string
}

export const commonEntityManagementQuestions =  [
  {
    caption: 'List component name',
    code: 'listComponentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'List',
    required: true,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Entity list mode',
    // description: 'Possible values: ' +
    //   '"edit" (there will be buttons to create and edit entity), ' +
    //   '"view" (read-only, there will be no action buttons), ' +
    //   '"view with details" (read-only, there will be a button to view entity details). ' +
    //   'Presence of delete button depends on whether delete mutation has been provided.',
    code: 'mode',
    propertyType: StudioTemplatePropertyType.OPTION,
    defaultValue: 'edit',
    options: ['edit', 'view', 'view with details'],
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Query to load items',
    code: 'listQuery',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Mutation to delete an item',
    code: 'deleteMutation',
    propertyType: StudioTemplatePropertyType.GRAPHQL_MUTATION,
    required: false,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Name of the id attribute',
    code: 'listIdField',
    propertyType: StudioTemplatePropertyType.STRING,
    required: false,
    defaultValue: 'id',
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: "Add to menu",
    code: "shouldAddToMenu",
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    required: true,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Details component name',
    code: 'detailsComponentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Details',
    required: true,
    step: {
      name: "Entity Details",
      order: "2"
    }
  },
  {
    caption: 'Query to load item',
    code: 'detailsQuery',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true,
    step: {
      name: "Entity Details",
      order: "2"
    }
  },
  {
    caption: 'Mutation to create or update item',
    code: 'upsertMutation',
    propertyType: StudioTemplatePropertyType.GRAPHQL_MUTATION,
    required: false,
    step: {
      name: "Entity Details",
      order: "2"
    }
  },
  {
    caption: 'Name of the id attribute',
    code: 'detailsIdField',
    propertyType: StudioTemplatePropertyType.STRING,
    defaultValue: 'id',
    required: false,
    step: {
      name: "Entity Details",
      order: "2"
    }
  }
];
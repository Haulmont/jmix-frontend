import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export interface AppAnswers {
  appTitle: string;
  appShortName: string;
  graphqlUri: string;
}

export const appQuestions: StudioTemplateProperty[] = [
  {
    code: 'appTitle',
    caption: 'App title',
    propertyType: StudioTemplatePropertyType.STRING,
  },
  {
    code: 'appShortName',
    caption: 'App short name',
    propertyType: StudioTemplatePropertyType.STRING,
  },
  {
    code: 'graphqlUri',
    caption: 'GraphQL URI',
    propertyType: StudioTemplatePropertyType.STRING,
    defaultValue: '/graphql'
  }
];
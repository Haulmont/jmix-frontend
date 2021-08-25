import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export interface MvpAppAnswers {
  appTitle: string;
  appShortName: string;
  graphqlUri: string;
}

export const mvpAppQuestions: StudioTemplateProperty[] = [
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
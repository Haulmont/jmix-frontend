import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {
  askStringIdQuestions,
  StringIdAnswers,
} from "../../../building-blocks/stages/answers/pieces/stringId";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {isStringIdEntity} from "../../../building-blocks/stages/template-model/pieces/entity";
import { BrowserTypes, createBrowserTypeQuestion } from "../entity-browser/answers";
import {
  createComponentNameQuestion,
  entityQuestion,
  EntityAnswer,
  menuItemQuestion,
  MenuItemAnswer,
  createQueryQuestion,
} from "../../../building-blocks/stages/answers/pieces/defaultAnswers";

export interface EntityManagementAnswers extends
EntityAnswer,
MenuItemAnswer,
StringIdAnswers {
  editorComponentName: string;
  editorQuery: string;

  browserComponentName: string;
  browserType: BrowserTypes;
  browserQuery: string;
}

export const commonEntityManagementQuestions: StudioTemplateProperty[] = [
  entityQuestion,
  menuItemQuestion,
  createComponentNameQuestion({
    code: 'browserComponentName',
    caption: 'Browser component name',
    defaultValue: "List",
    step: {
      name: "Entity Browser",
      order: "1"
    }
  }),
  createBrowserTypeQuestion({
    step: {
      name: "Entity Browser",
      order: "1"
    }
  }),
  createQueryQuestion({
    code: 'browserQuery',
    caption: 'GraphQL query for entity browser',
    relatedProperty: "entity",
    step: {
      name: "Entity Browser",
      order: "1"
    }
  }),
  createComponentNameQuestion({
    code: 'editorComponentName',
    caption: 'Editor component name',
    defaultValue: 'Editor',
    step: {
      name: "Entity Editor",
      order: "2"
    }
  }),
  createQueryQuestion({
    code: 'editorQuery',
    // Subject to change, in future we might want to get the full query from Studio
    caption: 'GraphQL query for entity editor',
    relatedProperty: "entity",
    step: {
      name: "Entity Editor",
      order: "2"
    }
  }),
];

export const getAnswersFromPrompt = async (
  projectModel: ProjectModel, gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<EntityManagementAnswers> => {
  const initialQuestions = [
    ...commonEntityManagementQuestions
  ];

  const answers: EntityManagementAnswers = await askQuestions<EntityManagementAnswers>(initialQuestions, projectModel, gen);

  if (isStringIdEntity(projectModel, answers.entity)) {
    const stringIdAnswers = await askStringIdQuestions(
      answers.entity,
      projectModel,
      gen
    );
    return {
      ...answers,
      ...stringIdAnswers
    }
  }

  return answers;
};
import {CommonGenerationOptions} from "../../../common/cli-options";
import {ProjectModel, View} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";
import {EntityWithPath} from "../../../building-blocks/stages/template-model/pieces/entity";
import {stringIdQuestions} from "../../../building-blocks/stages/answers/pieces/stringId";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";
import {ListTypes} from "../../../building-blocks/stages/template-model/pieces/entity-management/list-types";
import {commonEntityManagementQuestions, viewQuestions} from "../../../building-blocks/stages/answers/pieces/entity-management/entity-management-common";

export type Answers = {
    entity: EntityWithPath;
    managementComponentName: string;
    listType: ListTypes;
    listView: View;
    listComponentName: string;
    listAttributes: string;
    editComponentName: string;
    editAttributes: string;
    editView: View;
    nestedEntityInfo?: Record<string, string>;
    idAttrName?: string;
  }

  export const allQuestions: StudioTemplateProperty[] = [
    ...commonEntityManagementQuestions,
    ...viewQuestions,
    ...stringIdQuestions
  ];

  export const getAnswersFromPrompt = async (
    projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
  ): Promise<Answers> => {
  
    const initialQuestions = [
      ...commonEntityManagementQuestions,
      ...viewQuestions
    ];
    let answers = await askQuestions<Answers>(initialQuestions, projectModel, gen);

    return answers;
  }

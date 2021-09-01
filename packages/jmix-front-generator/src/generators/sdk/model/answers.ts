
import {StudioProjectInfo} from '../../../common/studio/studio-integration';
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {StudioTemplateProperty} from "../../../common/studio/studio-model";

export interface Answers {
  projectInfo: StudioProjectInfo;
}

export const allQuestions: StudioTemplateProperty[] = [];

export const getAnswersFromPrompt = async (
  _projectModel: ProjectModel, _gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<Answers> => {
  return {} as Answers;
}

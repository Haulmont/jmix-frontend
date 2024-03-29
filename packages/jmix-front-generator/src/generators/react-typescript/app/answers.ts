
import {StudioProjectInfo} from '../../../common/studio/studio-integration';
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";

export type MenuType = "vertical" | "horizontal";

export interface Answers {
  projectInfo: StudioProjectInfo;
  menuType: MenuType;
}

const menuTypeQuestion: StudioTemplateProperty = {
  code: 'menuType',
  caption: 'Menu type',
  propertyType: StudioTemplatePropertyType.OPTION,
  defaultValue: "vertical",
  options: ["vertical", "horizontal"],
}

export const allQuestions: StudioTemplateProperty[] = [menuTypeQuestion];

export const getAnswersFromPrompt = async (
  _projectModel: ProjectModel, _gen: YeomanGenerator, _options: CommonGenerationOptions
): Promise<Answers> => {
  return { menuType: "vertical" } as Answers;
}

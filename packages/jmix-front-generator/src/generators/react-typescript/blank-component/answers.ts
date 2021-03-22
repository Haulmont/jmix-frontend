import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ProjectModel} from "../../../common/model/cuba-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {CommonGenerationOptions} from "../../../common/cli-options";
import {askQuestions} from "../../../building-blocks/stages/answers/defaultGetAnswersFromPrompt";

const blankComponentQuestions: StudioTemplateProperty[] = [
  {
    caption: "Component class name",
    code: "componentName",
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    required: true
  }
];
export interface Answers {
    componentName: string
}

  
const questionsToBeAskedInCLI = [
  ...blankComponentQuestions
];

export const allQuestions: StudioTemplateProperty[] = [
    ...questionsToBeAskedInCLI
  ];

  export const getAnswersFromPrompt = async (
    projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
  ): Promise<Answers> => {    
    const answers = await askQuestions<Answers>(questionsToBeAskedInCLI, projectModel, gen);

    return answers;
  }

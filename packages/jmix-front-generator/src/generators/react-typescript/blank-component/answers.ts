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

export const allQuestions: StudioTemplateProperty[] = [
    ...blankComponentQuestions
  ];

  export const getAnswersFromPrompt = async (
    projectModel: ProjectModel, gen: YeomanGenerator, options: CommonGenerationOptions
  ): Promise<Answers> => {
  
    const initialQuestions = [
      ...blankComponentQuestions
    ];
    
    let answers = await askQuestions<Answers>(initialQuestions, projectModel, gen);

    return answers;
  }

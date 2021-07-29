import {
  askQuestions,
  CommonGenerationOptions,
  ProjectModel,
  StudioTemplateProperty,
  StudioTemplatePropertyType,
  YeomanGenerator
} from "@haulmont/jmix-front-generator";

const blankComponentQuestions: StudioTemplateProperty[] = [
  {
    caption: "Component class name",
    code: "componentName",
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    required: true
  },
  {
    caption: "Menu item",
    code: "menuItem",
    propertyType: StudioTemplatePropertyType.MENU_ITEM,
    required: false
  }
];
export interface Answers {
  componentName: string,
  menuItem: string | null;
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

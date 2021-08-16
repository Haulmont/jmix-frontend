import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, allQuestions, CardsWithDetailsAnswers } from "./answers";
import path from "path";
import {CardsWithDetailsTemplateModel, deriveCardsWithDetailsTemplateModel} from "./template-model";
import {writeCardsWithDetails} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactCardsWithDetailsGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, CardsWithDetailsAnswers, CardsWithDetailsTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: allQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel: deriveCardsWithDetailsTemplateModel,
          write: writeCardsWithDetails,
        }
      },
      this
    );
  }
}

const description = 'Read-only list of entities with expandable details.';
const icon = 'entity-cards-with-details.svg';
const index = 10;

export {
  ReactCardsWithDetailsGenerator as generator,
  componentOptionsConfig as options,
  allQuestions as params,
  description,
  icon,
  index,
}
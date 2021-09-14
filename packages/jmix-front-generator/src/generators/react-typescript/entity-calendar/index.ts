import {componentOptionsConfig} from "../../../common/cli-options";
import path from "path";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {calendarQuestions, CalendarAnswers, getAnswersFromPrompt} from "./answers";
import { Options } from "./options";
import {CalendarTemplateModel, deriveCalendarTemplateModel} from "./template-model";
import {write} from "./write";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { ComponentOptions } from "../../../building-blocks/stages/options/pieces/component";

export class EntityCalendarGenerator extends YeomanGenerator {

  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<Options, CalendarAnswers, CalendarTemplateModel>({
      templateDir: path.join(__dirname, 'template'),
      questions: calendarQuestions, // Used when refining answers
      stages: { // Using custom implementations for some of the stages
        getAnswersFromPrompt,
        deriveTemplateModel: deriveCalendarTemplateModel,
        write
      }
    }, this);
  }
}

const description = 'Read-only calendar of events. Event is an entity with attributes: title, description, event start, and event end.';
const icon = 'entity-calendar.svg';
const index = 12;

export {
  EntityCalendarGenerator as generator,
  componentOptionsConfig as options,
  calendarQuestions as params,
  description,
  icon,
  index
}

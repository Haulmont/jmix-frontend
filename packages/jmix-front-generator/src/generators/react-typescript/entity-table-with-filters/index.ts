import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {componentOptionsConfig} from "../../../common/cli-options";
import {defaultPipeline} from "../../../building-blocks/pipelines/defaultPipeline";
import {getAnswersFromPrompt, tableWithFiltersQuestions, TableWithFiltersAnswers } from "./answers";
import path from "path";
import {TableWithFiltersTemplateModel, deriveTableWithFiltersTemplateModel} from "./template-model";
import {writeTableWithFilters} from "./write";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";

export class ReactTableWithFiltersGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: ComponentOptions) {
    super(args, options);
  }

  async generate() {
    await defaultPipeline<ComponentOptions, TableWithFiltersAnswers, TableWithFiltersTemplateModel>(
      {
        templateDir: path.join(__dirname, 'template'),
        questions: tableWithFiltersQuestions,
        stages: {
          getAnswersFromPrompt,
          deriveTemplateModel: deriveTableWithFiltersTemplateModel,
          write: writeTableWithFilters,
        }
      },
      this
    );
  }
}

const description = 'Read-only table of entities with filterable columns.';
const icon = 'entity-multi-selection-table.svg';
const index = 11;

export {
  ReactTableWithFiltersGenerator as generator,
  componentOptionsConfig as options,
  tableWithFiltersQuestions as params,
  description,
  icon,
  index,
}
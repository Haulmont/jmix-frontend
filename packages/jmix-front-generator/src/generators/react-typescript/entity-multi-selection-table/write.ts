import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {MultiSelectionTableTemplateModel} from "./template-model";
import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import multiSelectionTableMessagesEn from "./template/multi-selection-table-i18n-messages/en.json";
import multiSelectionTableMessagesFr from "./template/multi-selection-table-i18n-messages/fr.json";
import multiSelectionTableMessagesRu from "./template/multi-selection-table-i18n-messages/ru.json";
import {addEntityMenuItem, addAppMenu} from "../../../building-blocks/stages/writing/pieces/menu";
import {addComponentPreviews} from "../../../building-blocks/stages/writing/pieces/previews-registration";
import { YeomanGenerator } from "../../../building-blocks/YeomanGenerator";
import * as path from "path";

export const writeMultiSelectionTableMessages: WriteStage<ComponentOptions, {className: string}> = async (
  projectModel, templateModel, gen, options
) => {
  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales,
    {
      en: multiSelectionTableMessagesEn,
      fr: multiSelectionTableMessagesFr,
      ru: multiSelectionTableMessagesRu
    }
  );
}

export const writeMultiSelectionTable: WriteStage<ComponentOptions, MultiSelectionTableTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {
    className,
    nameLiteral,
    menuItem
  } = templateModel;

  const extension = '.tsx.ejs';

  writeMultiSelectionTableComponent(gen, extension, templateModel);

  await writeMultiSelectionTableMessages(projectModel, templateModel, gen, options);

  addAppMenu(gen, dirShift, className, menuItem);
  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, className, className, true);
};

export function writeMultiSelectionTableComponent<M extends {className: string}>(
  gen: YeomanGenerator,
  extension: string,
  model: M
) {
  gen.fs.copyTpl(
    path.join(__dirname, 'template', 'MultiSelectionTable' + extension),
    gen.destinationPath(model.className + extension), model
  );
}
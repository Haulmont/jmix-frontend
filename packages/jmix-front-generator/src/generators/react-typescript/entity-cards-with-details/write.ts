import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {CardsWithDetailsTemplateModel} from "./template-model";
import {addEntityMenuItem, addAppMenu} from "../../../building-blocks/stages/writing/pieces/menu";
import {addComponentPreviews} from "../../../building-blocks/stages/writing/pieces/previews-registration";
import { YeomanGenerator } from "../../../building-blocks/YeomanGenerator";
import * as path from "path";
import { writeComponentI18nMessages } from "../../../building-blocks/stages/writing/pieces/i18n";
import {addToPalette} from "../../../building-blocks/stages/writing/pieces/palette";

export const writeCardsWithDetails: WriteStage<ComponentOptions, CardsWithDetailsTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {
    className,
    nameLiteral,
    menuItem
  } = templateModel;

  const extension = '.tsx.ejs';

  writeCardsWithDetailsComponent(gen, extension, templateModel);

  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales
  );

  addAppMenu(gen, dirShift, className, menuItem);
  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, className, className);
  addToPalette(gen, dirShift, className)
};

export function writeCardsWithDetailsComponent<M extends { className: string}>(
  gen: YeomanGenerator,
  extension: string,
  model: M
) {
  gen.fs.copyTpl(
    path.join(__dirname, 'template', 'CardsWithDetails' + extension),
    gen.destinationPath(model.className + extension), model
  );
}
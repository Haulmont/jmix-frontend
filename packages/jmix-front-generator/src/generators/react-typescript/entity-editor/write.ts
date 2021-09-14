import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {EntityEditorTemplateModel} from "./template-model";
import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import {addAppMenu, addEntityMenuItem} from "../../../building-blocks/stages/writing/pieces/menu";
import {addComponentPreviews} from "../../../building-blocks/stages/writing/pieces/previews-registration";
import { YeomanGenerator } from "../../../building-blocks/YeomanGenerator";
import * as path from "path"
import {addToPalette} from "../../../building-blocks/stages/writing/pieces/palette";

export const writeEditor: WriteStage<ComponentOptions, EntityEditorTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {
    className,
    nameLiteral,
    menuItem,
    shouldAddToMenu
  } = templateModel;

  const extension = '.tsx.ejs';

  writeEditorComponent(gen, extension, templateModel);

  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales
  );

  if(shouldAddToMenu){
      addAppMenu(gen, dirShift, className, menuItem);
  }

  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, className, className, true, {entityId: 'new'});
  addToPalette(gen, dirShift, className)
};

export function writeEditorComponent<M extends {className: string}>(
  gen: YeomanGenerator,
  extension: string,
  model: M
) {
  gen.fs.copyTpl(
    path.join(__dirname, 'template', 'EntityEditor' + extension),
    gen.destinationPath(model.className + extension), model
  );
}
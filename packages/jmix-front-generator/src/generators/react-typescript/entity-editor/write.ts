import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {EntityEditorTemplateModel} from "./template-model";
import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import entityManagementEn from "./template/editor-i18n-messages/en.json";
import entityManagementFr from "./template/editor-i18n-messages/fr.json";
import entityManagementRu from "./template/editor-i18n-messages/ru.json";
import {addAppMenu, addEntityMenuItem} from "../../../building-blocks/stages/writing/pieces/menu";
import {addComponentPreviews} from "../../../building-blocks/stages/writing/pieces/previews-registration";
import { YeomanGenerator } from "../../../building-blocks/YeomanGenerator";
import * as path from "path"

export const writeEditorMessages: WriteStage<ComponentOptions, {
  className: string;
}> = async (
  projectModel, templateModel, gen, options
) => {
  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales,
    {
      en: entityManagementEn,
      fr: entityManagementFr,
      ru: entityManagementRu
    }
  );
}

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

  await writeEditorMessages(projectModel, templateModel, gen, options);

  if(shouldAddToMenu){
      addAppMenu(gen, dirShift, className, menuItem);
  }

  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, className, className, true, {entityId: 'new'});
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
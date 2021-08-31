import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {addAppMenu, addMenuItem} from "../../../building-blocks/stages/writing/pieces/menu";
import { YeomanGenerator } from "../../../building-blocks/YeomanGenerator";
import { writeComponentI18nMessages } from "../../../building-blocks/stages/writing/pieces/i18n";

export function writeFormWizardComponent<M extends {className: string}>(
  gen: YeomanGenerator,
  extension: string,
  model: M
) {
  gen.fs.copyTpl(
    gen.templatePath('FormWizard' + extension),
    gen.destinationPath(model.className + extension), model
  );
}


export const write: WriteStage<Options, TemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {
    className,
    nameLiteral,
    shouldAddToMenu,
    menuItem,
  } = templateModel;

  const extension = '.tsx.ejs';

  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales,
  );

  writeFormWizardComponent(gen, extension, templateModel);

  if(shouldAddToMenu){
    addAppMenu(gen, dirShift, className, menuItem);
  }
  addMenuItem(gen, dirShift, className, nameLiteral);
};

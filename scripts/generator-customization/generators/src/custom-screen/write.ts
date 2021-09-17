import {addMenuItem, addComponentPreviews, addAppMenu, writeComponentI18nMessages, WriteStage, YeomanGenerator } from "@haulmont/jmix-front-generator";
import {Options} from "./options";
import {TemplateModel} from "./template-model";

export const write: WriteStage<Options, TemplateModel> = async (
    projectModel, templateModel, gen, options
  ) => {
    const {dirShift} = options;
    const {className, nameLiteral, menuItem} = templateModel;
  
    const extension = '.tsx';

    writeBlankComponent(gen, extension, templateModel);
    writeComponentI18nMessages(
      gen, 
      className, 
      dirShift, 
      projectModel.project?.locales
    );

    addAppMenu(gen, dirShift, className, menuItem);
    addMenuItem(gen, dirShift, className, nameLiteral);
    addComponentPreviews(gen, dirShift, className, nameLiteral);
}

function writeBlankComponent<M extends {className: string}>(
    gen: YeomanGenerator,
    extension: string,
    model: M
  ) {
    gen.fs.copyTpl(
      gen.templatePath('Component' + extension),
      gen.destinationPath(model.className + extension), model
    );
  }

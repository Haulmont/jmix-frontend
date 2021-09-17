import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {addMenuItem, addAppMenu} from "../../../building-blocks/stages/writing/pieces/menu";
import {Options} from "./options";
import {TemplateModel} from "./template-model";

export const write: WriteStage<Options, TemplateModel> = async (
    projectModel, templateModel, gen, options
  ) => {
    const {dirShift} = options;
    const {className, nameLiteral, menuItem} = templateModel;
  
    const extension = '.tsx.ejs';

    gen.fs.copyTpl(
      gen.templatePath('ColunmLayout' + extension),
      gen.destinationPath(className + extension),
      templateModel,
    );
    writeComponentI18nMessages(
      gen, 
      className, 
      dirShift, 
      projectModel.project?.locales
    );
    
    addAppMenu(gen, dirShift, className, menuItem);
    addMenuItem(gen, dirShift, className, nameLiteral);
}

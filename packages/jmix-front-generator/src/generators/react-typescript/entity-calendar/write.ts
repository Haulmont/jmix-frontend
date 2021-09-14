import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {addMenuItem, addAppMenu} from "../../../building-blocks/stages/writing/pieces/menu";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {Options} from "./options";
import {CalendarTemplateModel} from "./template-model";

export const write: WriteStage<Options, CalendarTemplateModel> = async (
    projectModel, templateModel, gen, options
  ) => {

  const {dirShift} = options;
  const {className, nameLiteral, menuItem} = templateModel;
  
  const extension = '.tsx.ejs';

  writeCalendarComponent(gen, extension, templateModel);
  writeComponentI18nMessages(
    gen.fs, 
    className, 
    dirShift, 
    projectModel.project?.locales
  );

  addAppMenu(gen, dirShift, className, menuItem);
  addMenuItem(gen, dirShift, className, nameLiteral);
}


function writeCalendarComponent<M extends {className: string}>(
  gen: YeomanGenerator,
  extension: string,
  model: M
) {
  gen.fs.copyTpl(
    gen.templatePath('EntityCalendar' + extension),
    gen.destinationPath(model.className + extension), model
  );
}

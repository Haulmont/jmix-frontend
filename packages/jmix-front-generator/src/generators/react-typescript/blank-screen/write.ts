import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {addMenuItem, addAppMenu} from "../../../building-blocks/stages/writing/pieces/menu";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import {addComponentPreviews} from "../../../building-blocks/stages/writing/pieces/previews-registration";
import {addToPalette} from "../../../building-blocks/stages/writing/pieces/palette";

export const write: WriteStage<Options, TemplateModel> = async (
    projectModel, templateModel, gen, options
  ) => {
    const {dirShift} = options;
    const {className, nameLiteral, menuItem} = templateModel;
  
    const extension = '.tsx';

    writeBlankComponent(gen, extension, templateModel);
    writeComponentI18nMessages(
      gen.fs, 
      className, 
      dirShift, 
      projectModel.project?.locales
    );

    addAppMenu(gen, dirShift, className, menuItem);
    addMenuItem(gen, dirShift, className, nameLiteral);
    addComponentPreviews(gen, dirShift, className, nameLiteral);
    addToPalette(gen, dirShift, className)
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

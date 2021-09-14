import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {MasterDetailTemplateModel, MasterDetailBrowserTemplateModel, MasterDetailComponentTemplateModel} from "./template-model";
import * as path from "path";
import { EntityEditorTemplateModel } from "../entity-editor/template-model";
import { addAppMenu, addEntityMenuItem } from "../../../building-blocks/stages/writing/pieces/menu";
import { addComponentPreviews } from "../../../building-blocks/stages/writing/pieces/previews-registration";
import { writeComponentI18nMessages } from "../../../building-blocks/stages/writing/pieces/i18n";
import {addToPalette} from "../../../building-blocks/stages/writing/pieces/palette";

const writeMasterDetailEditorComponent: WriteStage<ComponentOptions, EntityEditorTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {className} = templateModel;

  const extension = '.tsx.ejs';

  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales
  );

  gen.fs.copyTpl(
    path.join(__dirname, 'template', 'EntityEditor' + extension),
    gen.destinationPath(className + extension),
    templateModel
  );
};

const writeMasterDetailBrowserComponent: WriteStage<ComponentOptions, MasterDetailBrowserTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {className} = templateModel;

  const extension = '.tsx.ejs';

  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales
  );

  gen.fs.copyTpl(
    path.join(__dirname, 'template', 'Table' + extension),
    gen.destinationPath(className + extension),
    templateModel
  );
};

const writeMasterDetailComponent: WriteStage<ComponentOptions, MasterDetailComponentTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {
    className,
    nameLiteral,
    menuItem,
  } = templateModel;

  const extension = '.tsx.ejs';

  gen.fs.copyTpl(
    path.join(__dirname, 'template', 'MasterDetail' + extension),
    gen.destinationPath(className + extension),
    templateModel
  );

  writeComponentI18nMessages(
    gen.fs,
    templateModel.className,
    options.dirShift,
    projectModel.project?.locales
  );

  addAppMenu(gen, dirShift, className, menuItem);
  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, className, className, true);
  addToPalette(gen, dirShift, className)
}

export const writeMasterDetail: WriteStage<ComponentOptions, MasterDetailTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  await writeMasterDetailEditorComponent(projectModel, templateModel.editorTemplateModel, gen, options);
  await writeMasterDetailBrowserComponent(projectModel, templateModel.browserTemplateModel, gen, options);
  await writeMasterDetailComponent(projectModel, templateModel.masterDetailTemplateModel, gen, options);
};

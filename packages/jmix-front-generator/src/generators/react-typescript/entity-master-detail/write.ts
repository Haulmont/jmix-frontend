import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {MasterDetailTemplateModel, MasterDetailBrowserTemplateModel, MasterDetailComponentTemplateModel} from "./template-model";
import * as path from "path";
import { EntityEditorTemplateModel } from "../entity-editor/template-model";
import { addAppMenu, addEntityMenuItem } from "../../../building-blocks/stages/writing/pieces/menu";
import { addComponentPreviews } from "../../../building-blocks/stages/writing/pieces/previews-registration";
import { writeEditorMessages } from "../entity-editor/write";
import { writeBrowserMessages } from "../entity-browser/write";
import { writeComponentI18nMessages } from "../../../building-blocks/stages/writing/pieces/i18n";
import entityMasterDetailEn from "./template/master-detail-i18n-messages/en.json";
import entityMasterDetailRu from "./template/master-detail-i18n-messages/ru.json";
import entityMasterDetailFr from "./template/master-detail-i18n-messages/fr.json";

const writeMasterDetailEditorComponent: WriteStage<ComponentOptions, EntityEditorTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {className} = templateModel;

  const extension = '.tsx.ejs';

  await writeEditorMessages(projectModel, templateModel, gen, options);

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

  await writeBrowserMessages(projectModel, templateModel, gen, options);

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
    projectModel.project?.locales,
    {
      en: entityMasterDetailEn,
      fr: entityMasterDetailFr,
      ru: entityMasterDetailRu
    }
  );

  addAppMenu(gen, dirShift, className, menuItem);
  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, className, className, true);
}

export const writeMasterDetail: WriteStage<ComponentOptions, MasterDetailTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  await writeMasterDetailEditorComponent(projectModel, templateModel.editorTemplateModel, gen, options);
  await writeMasterDetailBrowserComponent(projectModel, templateModel.browserTemplateModel, gen, options);
  await writeMasterDetailComponent(projectModel, templateModel.masterDetailTemplateModel, gen, options);
};

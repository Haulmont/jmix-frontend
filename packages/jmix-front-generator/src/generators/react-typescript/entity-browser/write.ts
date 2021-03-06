import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {ComponentOptions} from "../../../building-blocks/stages/options/pieces/component";
import {EntityBrowserTemplateModel} from "./template-model";
import {writeComponentI18nMessages} from "../../../building-blocks/stages/writing/pieces/i18n";
import entityManagementEn from "./template/browser-i18n-messages/en.json";
import entityManagementFr from "./template/browser-i18n-messages/fr.json";
import entityManagementRu from "./template/browser-i18n-messages/ru.json";
import {addEntityMenuItem, addAppMenu} from "../../../building-blocks/stages/writing/pieces/menu";
import {addComponentPreviews} from "../../../building-blocks/stages/writing/pieces/previews-registration";
import { capitalizeFirst } from "../../../common/utils";
import { YeomanGenerator } from "../../../building-blocks/YeomanGenerator";
import { BrowserTypes } from "./answers";
import * as path from "path";

export const writeBrowserMessages: WriteStage<ComponentOptions, {className: string}> = async (
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

export const writeBrowser: WriteStage<ComponentOptions, EntityBrowserTemplateModel> = async (
  projectModel, templateModel, gen, options
) => {
  const {dirShift} = options;
  const {
    className,
    nameLiteral,
    browserType,
    menuItem
  } = templateModel;

  const extension = '.tsx.ejs';

  writeBrowserComponent(gen, extension, templateModel);

  await writeBrowserMessages(projectModel, templateModel, gen, options);

  addAppMenu(gen, dirShift, className, menuItem);
  addEntityMenuItem(gen, dirShift, className, nameLiteral);
  addComponentPreviews(gen, dirShift, className, className, true, generateMockProps(browserType));
};

function generateMockProps(listType: BrowserTypes): any {
  if(listType === "table") {
    return null;
  }

  return {
    paginationConfig: {},
    onPagingChange: () => {}
  }
}

export function writeBrowserComponent<L extends string, M extends {browserType: L, className: string}>(
  gen: YeomanGenerator,
  extension: string,
  model: M
) {
  gen.fs.copyTpl(
    path.join(__dirname, 'template', capitalizeFirst(model.browserType) + extension),
    gen.destinationPath(model.className + extension), model
  );
}
import {WriteStage} from "../../../building-blocks/pipelines/defaultPipeline";
import {addAddomMenuItem, addAppMenu} from "../../../building-blocks/stages/writing/pieces/menu";
import {Options} from "./options";
import {TemplateModel} from "./template-model";
import { MenuItemTypes } from "../common/menu";
import uuid from "uuid";
import { ProjectModel } from "src/common/model/cuba-model";
import {writeComponentI18nMessages, ComponentType} from "../../../building-blocks/stages/writing/pieces/i18n";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";

export const write: WriteStage<Options, TemplateModel> = async (
    projectModel, templateModel, gen, options
  ) => {
    const {dirShift, addonPackageName} = options;
    writeAddonI18nMessages(templateModel, gen, projectModel, dirShift);
    addAddonAppMenu(templateModel, gen, dirShift);
    addAddomMenuItem(gen, dirShift, templateModel.addonName, addonPackageName);
}

function addAddonAppMenu(templateModel: TemplateModel, gen: YeomanGenerator, dirShift: string) {
    const {addonName, screenNames} = templateModel;

    if (screenNames.length > 1) {
      const addonKey = uuid.v4();
      addAppMenu(gen, dirShift, `addons.${addonName}`, "ADDON", MenuItemTypes.SubMenuItem, addonKey);
      screenNames.forEach((screenName) => {
        addAppMenu(gen, dirShift, screenName, addonKey, MenuItemTypes.MenuItem);
      })
      return;
    }

    const [screenName] = screenNames;
    addAppMenu(gen, dirShift, screenName, "ADDON", MenuItemTypes.MenuItem);
}

function writeAddonI18nMessages(
  templateModel: TemplateModel, 
  gen: YeomanGenerator, 
  projectModel: ProjectModel,
  dirShift: string
) {
  const {addonName, screenNames, messages} = templateModel;

  writeComponentI18nMessages(gen.fs, addonName, dirShift, projectModel.project?.locales, messages, ComponentType.Addon);

  screenNames.forEach((screenName) => {
    writeComponentI18nMessages(gen.fs, screenName, dirShift, projectModel.project?.locales);
  })
}

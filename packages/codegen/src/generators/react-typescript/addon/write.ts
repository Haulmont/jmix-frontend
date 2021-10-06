import {TemplateModel} from "./template-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { addScreenI18nKeyEn } from "src/building-blocks/stages/writing/pieces/mvp/mvp";
import { addMvpAppMenu } from "src/building-blocks/stages/writing/pieces/mvp/addMvpAppMenu";

export async function write (
  templateModel: TemplateModel, gen: YeomanGenerator
  ) {

    writeAddonI18nMessages(templateModel, gen);
    addAddonAppMenu(templateModel, gen);
}


function addAddonAppMenu(templateModel: TemplateModel, gen: YeomanGenerator) {
    const {addonName, screenNames, relDirShift} = templateModel;

    if (screenNames.length > 1) {
      screenNames.forEach((screenName) => {
        addMvpAppMenu({gen, dirShift: relDirShift , route: screenName, componentName: screenName});
      })
      return;
    }

    const [screenName] = screenNames;
    addMvpAppMenu({gen, dirShift: relDirShift , route: screenName, componentName: screenName});
}


function writeAddonI18nMessages(
  templateModel: TemplateModel, 
  gen: YeomanGenerator, 
) {
  const {addonName, screenNames, relDirShift} = templateModel;

  addScreenI18nKeyEn(addonName, relDirShift, gen, "addons");

  screenNames.forEach((screenName) => {
    addScreenI18nKeyEn(screenName, relDirShift, gen);
  })
}

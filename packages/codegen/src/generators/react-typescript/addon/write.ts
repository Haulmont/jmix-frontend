import {TemplateModel} from "./template-model";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import { addScreenI18nKeyEn, addI18nMessagesEn } from "../../../building-blocks/stages/writing/pieces/mvp/mvp";
import { addMvpAppMenu } from "../../../building-blocks/stages/writing/pieces/mvp/addMvpAppMenu";
import { addAddonPalette } from "../../../building-blocks/stages/writing/pieces/mvp/addAddonPalette";

export async function write (
  templateModel: TemplateModel, gen: YeomanGenerator
  ) {
    writeAddonI18nMessages(templateModel, gen);
    addAddonAppMenu(templateModel, gen);
    addPalette(templateModel, gen);
}


function addAddonAppMenu(templateModel: TemplateModel, gen: YeomanGenerator) {
    const {addonPackageName, screenNames, relDirShift} = templateModel;

    if (screenNames.length > 1) {
      screenNames.forEach((screenName) => {
        addMvpAppMenu({
          gen, dirShift: 
          relDirShift, 
          route: screenName, 
          componentName: screenName,
          pathToComponent: addonPackageName,
          isAddon: true
        });
      })
      return;
    }

    const [screenName] = screenNames;
    addMvpAppMenu({
      gen, 
      dirShift: relDirShift,
      route: screenName,
      componentName: screenName,
      pathToComponent: addonPackageName,
      isAddon: true
    });
}


function writeAddonI18nMessages(
  templateModel: TemplateModel, 
  gen: YeomanGenerator, 
) {
  const {addonName, screenNames, relDirShift, messages} = templateModel;

  addScreenI18nKeyEn(addonName, relDirShift, gen, "addons");

  screenNames.forEach((screenName) => {
    addScreenI18nKeyEn(screenName, relDirShift, gen);
  })

  if(messages["en"] != null) {
    addI18nMessagesEn(relDirShift, gen, messages["en"]);
  }
}

function addPalette(
  templateModel: TemplateModel, 
  gen: YeomanGenerator, 
) {
  const {relDirShift, paletteComponentName, addonPackageName} = templateModel;
  if(paletteComponentName != null) {
    addAddonPalette(gen, relDirShift, paletteComponentName, addonPackageName);
  }
}

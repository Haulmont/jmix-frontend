import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../../common/utils";
import { addMvpAppMenu } from "./addMvpAppMenu";

export interface MvpComponentTemplateModel {
  componentName: string;
  route: string;
  caption: string;
  relDirShift: string;
  shouldAddToMenu: boolean;
  includesPath: (...paths: string[]) => string;
}

export async function writeAmplicodeComponent<T extends MvpComponentTemplateModel>(
  templateModel: T,
  gen: YeomanGenerator,
  srcPath: string
) {
  const {
    relDirShift,
    componentName,
    route,
    shouldAddToMenu
  } = templateModel;

  gen.log(`Generating to ${gen.destinationPath()}`);

  gen.fs.copyTpl(
    srcPath,
    gen.destinationPath(componentName + '.tsx'),
    templateModel
  );

  if (shouldAddToMenu) {
    addMvpAppMenu({
      gen,
      dirShift: relDirShift,
      route,
      componentName
    });
  }

  // TODO Previews
  // addComponentPreviews(gen, relDirShift, className, className, true, {
  //   paginationConfig: {},
  //   onPagingChange: () => {}
  // });

  addScreenI18nKeyEn(componentName, relDirShift, gen);
}

export function addScreenI18nKeyEn(
  className: string, 
  dirShift: string, 
  gen: YeomanGenerator, 
  componentType: "addons" | "screen" = "screen"
) {
  const existingMessagesPath = path.join(dirShift, `i18n/en.json`);
  const existingMessages: Record<string, string> | null = gen.fs.readJSON(existingMessagesPath);
  if (existingMessages == null) {
    throw new Error('i18n messages not found');
  }

  const screenNameKey = `${componentType}.${className}`;

  if (Object.keys(existingMessages).includes(screenNameKey)) {
    return;
  }

  const screenCaption = splitByCapitalLetter(capitalizeFirst(className));
  const mergedMessages = {
    ...existingMessages,
    [screenNameKey]: screenCaption
  };

  gen.fs.writeJSON(existingMessagesPath, mergedMessages);
}

export function addI18nMessagesEn(
  dirShift: string, 
  gen: YeomanGenerator, 
  messages: Record<string, string>
) {
  const existingMessagesPath = path.join(dirShift, `i18n/en.json`);
  const existingMessages: Record<string, string> | null = gen.fs.readJSON(existingMessagesPath);
  if (existingMessages == null) {
    throw new Error('i18n messages not found');
  }

  const existingKeys = Object.keys(existingMessages);
  const messagesKeys = Object.keys(messages);

  const keysToMerge = messagesKeys.filter((messageKey) => {
    const isMessageKeyExist = existingKeys.includes(messageKey);
    if(isMessageKeyExist) {
      gen.log(`message key '${messageKey}' already exists and will not be merged`);
    }
    return !isMessageKeyExist
  })

  if(keysToMerge.length === 0) {
    gen.log(`messages don't have any keys to merge`);
    return;
  }
  const messagesToMerge: Record<string, string> = keysToMerge.reduce((msgs, key) => {
    return {
      ...msgs,
      [key]: messages[key]
    }
  }, {})

  const mergedMessages = {
    ...existingMessages,
    ...messagesToMerge
  };

  gen.fs.writeJSON(existingMessagesPath, mergedMessages);
}

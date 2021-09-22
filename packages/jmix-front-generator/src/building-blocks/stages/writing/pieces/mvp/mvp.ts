import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../../common/utils";
import { addMvpAppMenu } from "./addMvpAppMenu";

export interface MvpComponentTemplateModel {
  componentName: string;
  route: string;
  relDirShift: string;
  shouldAddToMenu: boolean;
  includesPath: (...paths: string[]) => string;
}

export async function writeMvpComponent<T extends MvpComponentTemplateModel>(
  templateModel: T,
  gen: YeomanGenerator,
  srcPath: string
) {
  const {relDirShift, componentName, route, shouldAddToMenu} = templateModel;

  gen.log(`Generating to ${gen.destinationPath()}`);

  gen.fs.copyTpl(
    srcPath,
    gen.destinationPath(componentName + '.tsx'),
    templateModel
  );

  if (shouldAddToMenu) {
    addMvpAppMenu(gen, relDirShift, route);
  }

  // TODO Previews
  // addComponentPreviews(gen, relDirShift, className, className, true, {
  //   paginationConfig: {},
  //   onPagingChange: () => {}
  // });

  addScreenI18nKeyEn(componentName, relDirShift, gen);
}

export function addScreenI18nKeyEn(className: string, dirShift: string, gen: YeomanGenerator) {
  const existingMessagesPath = path.join(dirShift, `i18n/en.json`);
  const existingMessages: Record<string, string> | null = gen.fs.readJSON(existingMessagesPath);
  if (existingMessages == null) {
    throw new Error('i18n messages not found');
  }

  const screenNameKey = `screen.${className}`;

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

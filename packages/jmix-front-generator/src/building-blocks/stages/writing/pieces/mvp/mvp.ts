import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import {addAppMenu, addEntityMenuItem} from "../menu";
import {addComponentPreviews} from "../previews-registration";
import {CommonTemplateModel} from "../../../template-model/pieces/common";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../../common/utils";

export async function writeMvpComponent<T extends CommonTemplateModel>(
  templateModel: T,
  gen: YeomanGenerator,
  srcPath: string
) {
  const {relDirShift, className, menuItem, nameLiteral, shouldAddToMenu} = templateModel;

  gen.log(`Generating to ${gen.destinationPath()}`);

  gen.fs.copyTpl(
    srcPath,
    gen.destinationPath(className + '.tsx'),
    templateModel
  );

  if (shouldAddToMenu) {
    addAppMenu(gen, relDirShift, className, menuItem);
  }
  addEntityMenuItem(gen, relDirShift, className, nameLiteral);
  addComponentPreviews(gen, relDirShift, className, className, true, {
    paginationConfig: {},
    onPagingChange: () => {}
  });

  addScreenI18nKeyEn(className, relDirShift, gen);
}

function addScreenI18nKeyEn(className: string, dirShift: string, gen: YeomanGenerator) {
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

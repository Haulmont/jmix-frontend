import {Locale} from "../../../../common/model/cuba-model";
import path from "path";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../common/utils";
import { JSONSchema7Type } from "json-schema";
import Generator from "yeoman-generator";

export enum ComponentType {
  Screen = 'screen',
  Addon = 'addons'
}

// TODO Switch to a single i18n pack
// Moved (almost) unchanged from src/common

/**
 * Adds component i18n messages to the frontend client i18n message packs.
 * Also adds a menu item caption to the i18n file for locale `en`. The caption is constructed from the class name.
 * If any message already exists in the file - it will NOT be overwritten with a new value.
 *
 * @param fs - yeoman fs
 * @param className - component class name
 * @param dirShift - directory depth from project root
 * @param projectLocales - locales enabled for this project.
 * If provided, i18n messages will be added only for these locales.
 * Otherwise, i18n messages for all locales supported by Frontend UI will be added
 * (this situation is possible if the project model was created using an older Studio version and does not
 * contain locales info).
 * @param componentMessagesPerLocale - an object where keys are locale codes (such as 'en' or 'ru) and values
 * are objects containing i18n key/value pairs for that locale.
 */
export function writeComponentI18nMessages(
  gen: Generator,
  className: string,
  dirShift: string = './',
  projectLocales?: Locale[],
  componentMessagesPerLocale: Record<string, Record<string, string>> = {en: {}, ru: {}},
  componentType: ComponentType = ComponentType.Screen
) {
  Object.entries(componentMessagesPerLocale).forEach(([localeCode, componentMessages]) => {
    if (projectLocales == null || projectLocales.some(projectLocale => projectLocale.code === localeCode)) {
      const destRoot = gen.destinationRoot();
      const existingMessagesPath = path.join(destRoot, dirShift, 'i18n', `${localeCode}.json`);
      const existingMessages = gen.fs.readJSON(existingMessagesPath);
      const mergedMessages = mergeI18nMessages(existingMessages, componentMessages, className, localeCode, componentType);

      if (mergedMessages != null) {
        gen.fs.writeJSON(existingMessagesPath, mergedMessages);
      }
    }
  });
}

/**
 *
 * @param existingMessages - messages that already exist in the i18n file
 * @param componentMessages - messages required by the component
 * @param className - component class name, menu caption will be generated based on it
 * @param localeCode - e.g. 'en' or 'ru'
 *
 * @return messages to be written to the i18n file or `null` if no messages are to be added.
 * Messages to be added are determined as messages in `componentMessages` that are not
 * present in `existingMessages` plus (for `en` locale only) the menu caption
 * if not already present in `existingMessages`.
 */
function mergeI18nMessages(
  existingMessages: JSONSchema7Type | undefined,
  componentMessages: Record<string, string>,
  className: string,
  localeCode: string,
  componentType: ComponentType
): JSONSchema7Type | undefined {

  const screenCaption = splitByCapitalLetter(capitalizeFirst(className));

  if (localeCode === 'en') {
    componentMessages = {
      ...componentMessages,
      [`${componentType}.${className}`]: screenCaption
    };
  }

  return hasNewEntries(componentMessages, existingMessages)
    ? {
      ...componentMessages,
      ...(
        typeof existingMessages === 'object'
          ? existingMessages
          : {}
      )
    }
    : undefined;
}

function hasNewEntries(newVals: Record<string, string>, oldVals: JSONSchema7Type | undefined): boolean {
  const newKeys = Object.keys(newVals);

  if (newKeys.length === 0) { return false; }
  if (!oldVals) { return true; }

  return !newKeys.every((newK) => Object.keys(oldVals).some((oldK) => oldK === newK));
}
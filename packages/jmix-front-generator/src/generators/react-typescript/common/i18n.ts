import path from 'path';
import {Editor} from "mem-fs-editor";
import {capitalizeFirst, splitByCapitalLetter} from "../../../common/utils";
import {Locale} from '../../../common/model/cuba-model';
import { JSONSchema7Type } from "json-schema";

/**
 * @property strict - if true then all i18n keys must be filled
 */
export interface SupportClientLocation {
  filename?: string,
  localeName: string,
  antdLocaleName: string,
  caption: string,
  isRtlLayout?: boolean;
  strict: boolean,
}

export const SUPPORTED_CLIENT_LOCALES: SupportClientLocation[] = [
  {
    localeName: 'en',
    antdLocaleName: 'en_US',
    caption: 'English',
    strict: true
  },
  {
    localeName: 'ru',
    antdLocaleName: 'ru_RU',
    caption: 'Русский',
    strict: false 
  },
  {
    localeName: 'fr',
    antdLocaleName: 'fr_FR',
    caption: 'Français',
    strict: false 
  },
  {
    localeName: 'zh_cn',
    antdLocaleName: 'zh_CN',
    caption: '中文',
    strict: false
  }
];

/**
 * Adds component i18n messages to the frontend client i18n message packs.
 * Also adds a menu item caption to the i18n file for locale `en`. The caption is constructed from the class name.
 * If any message already exists in the file - it will NOT be overwritten with a new value.
 *
 * @deprecated moved to building-blocks
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
  fs: Editor,
  className: string,
  dirShift: string = './',
  projectLocales?: Locale[],
  componentMessagesPerLocale: Record<string, Record<string, string>> = {en: {}, ru: {}}
) {
  Object.entries(componentMessagesPerLocale).forEach(([localeCode, componentMessages]) => {
    if (projectLocales == null || projectLocales.some(projectLocale => projectLocale.code === localeCode)) {
      const existingMessagesPath = path.join(dirShift, `i18n/${localeCode}.json`);

      const existingMessages: JSONSchema7Type | undefined = fs.readJSON(existingMessagesPath);
      const mergedMessages = mergeI18nMessages(existingMessages, componentMessages, className, localeCode);

      if (mergedMessages != null) {
        fs.writeJSON(existingMessagesPath, mergedMessages);
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
  localeCode: string
): JSONSchema7Type | undefined {

  const screenCaption = splitByCapitalLetter(capitalizeFirst(className));

  if (localeCode === 'en') {
    componentMessages = {
      ...componentMessages,
      [`screen.${className}`]: screenCaption
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

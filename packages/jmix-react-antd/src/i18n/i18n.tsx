import {createIntl, createIntlCache, IntlShape} from "react-intl";
import {getMainStore, onMainStoreCreate} from "@haulmont/jmix-react-core";
import {MessageFormatElement} from "@formatjs/icu-messageformat-parser";
import {IntlCache} from "@formatjs/intl/src/types";

type MessagesGetter = (locale: string) => Record<string, string> | Record<string, MessageFormatElement[]>;

export type InitializeI18nProps = {
  defaultLocale: string,
  getMessages: MessagesGetter,
}

let i18n: IntlShape | undefined

export const getI18n = () => {
  if (i18n === undefined) {
    throw new Error("i18n instance is not initialized");
  }
  return i18n;
}

export const initializeI18n = ({defaultLocale, getMessages} : InitializeI18nProps) => {
  const cache = createIntlCache();
  updateIntl(getMessages, cache, defaultLocale);
  keepIntlUpdated(getMessages, cache);
}

const keepIntlUpdated = (getMessages: MessagesGetter, cache: IntlCache) => {
  onMainStoreCreate((mainStore) => {
    updateIntl(getMessages, cache);
    mainStore.onLocaleChange(() => updateIntl(getMessages, cache));
  })
}

const normalizeLocale = (locale: string) => {
  return locale.split(/-|_/)[0].toLowerCase()
}

const updateIntl = (getMessages: MessagesGetter, cache: IntlCache, defaultLocale?: string) => {
  const mainStore = getMainStore();
  const locale = mainStore?.locale == null ? defaultLocale : mainStore.locale;
  if (!locale) {
    return;
  }
  i18n = createIntl({
    locale: normalizeLocale(locale),
    messages: getMessages(locale),
  }, cache);
};

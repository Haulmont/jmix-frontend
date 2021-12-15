import {createIntl, createIntlCache, IntlShape} from "react-intl";
import {getMainStore, onMainStoreCreate} from "@haulmont/jmix-react-core";
import {localesStore} from "@haulmont/jmix-react-web";

let intl: IntlShape | undefined
const cache = createIntlCache();

export const getIntl = () => {
  return intl;
}

const keepIntlUpdated = () => {
  onMainStoreCreate((mainStore) => {
    updateIntl();
    mainStore.onLocaleChange(updateIntl);
  })
}

const updateIntl = () => {
  const mainStore = getMainStore();
  if (!mainStore || !mainStore.locale) {
    return;
  }
  intl = createIntl({
    locale: mainStore.locale,
    messages: localesStore.messagesMapping[mainStore.locale],
  }, cache);
}

keepIntlUpdated();
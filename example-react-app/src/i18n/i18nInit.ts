/**
 * To add new locale we need to
 * - register it in localesStore ('initializeLocales' function)
 * - register it in 'antdLocalesStore' ('addAntdLocale' function)
 * - register dayjs locale (as import below)
 */
import { localesStore } from "@haulmont/jmix-react-web";
import { antdLocalesStore } from "@haulmont/jmix-react-antd";
import en from "./en.json";
import en_US from "antd/es/locale/en_US";
import ru from "./ru.json";
import ru_RU from "antd/es/locale/ru_RU";
import "dayjs/locale/en";
import "dayjs/locale/ru";

localesStore.addLocale({
  locale: "en",
  caption: "English",
  messages: en
});

antdLocalesStore.addAntdLocale({
  localeName: "en",
  antdLocale: en_US
});

localesStore.addLocale({
  locale: "ru",
  caption: "Русский",
  messages: ru
});

antdLocalesStore.addAntdLocale({
  localeName: "ru",
  antdLocale: ru_RU
});

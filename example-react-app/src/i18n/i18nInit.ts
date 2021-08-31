import { localesStore } from "@haulmont/jmix-react-web";
import { antdLocalesStore } from "@haulmont/jmix-react-antd";
import en from "./en.json";
import en_US from "antd/es/locale/en_US";
import ru from "./ru.json";
import ru_RU from "antd/es/locale/ru_RU";

export function initializeLocales() {
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
}

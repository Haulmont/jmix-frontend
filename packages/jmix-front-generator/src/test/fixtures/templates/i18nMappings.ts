import en from "./en.json";
import enUs from "antd/es/locale/en_US";
import ru from "./ru.json";
import ruRu from "antd/es/locale/ru_RU";
import "dayjs/locale/en";
import "dayjs/locale/ru";

export const antdLocaleMapping = {
  en: enUs,
  ru: ruRu
};

export const messagesMapping = {
  en: en,
  ru: ru
};

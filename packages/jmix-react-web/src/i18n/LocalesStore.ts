import {makeObservable, action, observable, computed} from "mobx";

type LocalesInfo = {
  locale: string;
  caption: string;
}

type LocaleData = LocalesInfo & {
  messages: Record<string, string>;
}

type MessagesMapping = Record<string, Record<string, string>>;

class LocalesStore {
  private _messagesMapping: MessagesMapping;
  private _localesInfo: LocalesInfo[];

  constructor() {
    this._messagesMapping = {};
    this._localesInfo = [];
    makeObservable<LocalesStore, '_messagesMapping' | '_localesInfo'>(this, {
      _messagesMapping: observable,
      _localesInfo: observable,
      addLocale: action,
      messagesMapping: computed,
      localesInfo: computed
    });
  }

  addLocale({locale, caption, messages}: LocaleData) {
    this._messagesMapping[locale] = messages;
    this._localesInfo.push({locale, caption});
  }

  get messagesMapping() {
    return this._messagesMapping as Readonly<MessagesMapping>;
  }

  get localesInfo() {
    return this._localesInfo as readonly LocalesInfo[];
  }
}

export const localesStore = new LocalesStore();

import {makeObservable, action, observable, computed} from "mobx";

type LocalesInfo = {
  locale: string;
  caption: string;
  isRtlLayout?: boolean;
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

  addLocale({messages, ...localeInfo}: LocaleData) {
    this._messagesMapping[localeInfo.locale] = messages;
    this._localesInfo.push(localeInfo);
  }

  get messagesMapping() {
    return this._messagesMapping as Readonly<MessagesMapping>;
  }

  get localesInfo() {
    return this._localesInfo as readonly LocalesInfo[];
  }

  readonly isRtlLayout = (localeName: string | null) => {
    return this._localesInfo.find(({locale}) => {
      return localeName === locale;
    })?.isRtlLayout;
  }
}

export const localesStore = new LocalesStore();

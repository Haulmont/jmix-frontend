import {makeObservable, action, observable, computed} from "mobx";
import {Locale} from 'antd/es/locale-provider';

type AntdLocaleData = {
  antdLocale: Locale | undefined;
  localeName: string;
}

type AntdLocaleMapping = Record<string, Locale | undefined>;

class AntdLocalesStore {
  private _antdLocaleMapping: AntdLocaleMapping;

  constructor() {
    this._antdLocaleMapping = {};
    makeObservable<AntdLocalesStore, '_antdLocaleMapping'>(this, {
      _antdLocaleMapping: observable,
      addAntdLocale: action,
      antdLocaleMapping: computed
    });
  }

  addAntdLocale({localeName, antdLocale}: AntdLocaleData) {
    this._antdLocaleMapping[localeName] = antdLocale;
  }

  get antdLocaleMapping() {
    return this._antdLocaleMapping as Readonly<AntdLocaleMapping>;
  }
}

export const antdLocalesStore = new AntdLocalesStore();

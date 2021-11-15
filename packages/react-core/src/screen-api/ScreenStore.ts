import {makeObservable, action, observable, computed} from "mobx";
import {ReactComponent} from "./ReactComponent";

export type ScreenInfo = {
  captionKey: string;
  component: ReactComponent;
  props?: any;
}

type ScreenRegistry = Record<string, ScreenInfo>;

class ScreenStore {
  private _screenRegistry: ScreenRegistry;

  constructor() {
    this._screenRegistry = {};
    makeObservable<ScreenStore, '_screenRegistry'>(this, {
      _screenRegistry: observable,
      registerScreen: action,
      screenRegistry: computed,
      screenPaths: computed
    });
  }

  registerScreen(route: string, screenInfo: ScreenInfo) {
    this._screenRegistry[route] = screenInfo;
  }

  get screenRegistry() {
    return this._screenRegistry as Readonly<ScreenRegistry>;
  }

  get screenPaths(): string[] {
    return Object.keys(this._screenRegistry).map(k => "/" + k);
  }
}

export const screenStore = new ScreenStore();

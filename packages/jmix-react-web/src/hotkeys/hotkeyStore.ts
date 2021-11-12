import { action, computed, makeObservable, observable } from "mobx"
import { HotkeyConfig } from "./hotkeyConfig";

export class HotkeyStore {
  defaultHotkeyConfigs: HotkeyConfig[] = [];

  dynamicHotkeyConfigs: HotkeyConfig[] = [];

  get hotkeyConfigs() {
    const fromDefaultHotkeyConfigs = this.defaultHotkeyConfigs.filter(
      defaultHotkeyConfig => !this.dynamicHotkeyConfigs.some(
        dynamicHotkeyConfig => equalsHotkeyConfig(defaultHotkeyConfig, dynamicHotkeyConfig)
      )
    );
    const hotkeyConfigs = [...this.dynamicHotkeyConfigs, ...fromDefaultHotkeyConfigs]
    return hotkeyConfigs;
  }

  constructor(defaultHotkeyConfigs: HotkeyConfig[]) {
    makeObservable<HotkeyStore>(this, {
      dynamicHotkeyConfigs: observable,
      addHotkeyConfig: action,
      removeHotkeyConfigs: action,
      hotkeyConfigs: computed,
    });
    this.defaultHotkeyConfigs = defaultHotkeyConfigs;
  }

  addHotkeyConfig = (hotkeyConfig: HotkeyConfig) => {
    this.dynamicHotkeyConfigs.push(hotkeyConfig);
  }

  removeHotkeyConfigs = (hotkeyConfig: HotkeyConfig) => {
    const filtredDynamicHotkeyConfigs = this.dynamicHotkeyConfigs.filter(
      hotkeyConfigItem => !equalsHotkeyConfig(hotkeyConfig, hotkeyConfigItem)
    );
    this.dynamicHotkeyConfigs = filtredDynamicHotkeyConfigs;
  }
}

export function equalsHotkeyConfig(hotkeyConfigOne: HotkeyConfig, hotkeyConfigTwo: HotkeyConfig) {
  return hotkeyConfigOne.description === hotkeyConfigTwo.description
}

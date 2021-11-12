import { HotkeyConfig } from './hotkeyConfig';
import {equalsHotkeyConfig, HotkeyStore} from './hotkeyStore';

const oneHotkeyConfig: HotkeyConfig = {
  description: 'oneDescription',
  categoryName: 'oneCategoryName',
  hotkey: '1',
};

const twoHotkeyConfig: HotkeyConfig = {
  description: 'twoDescription',
  categoryName: 'twoCategoryName',
  hotkey: '2',
};

describe('HotkeyStore', () => {
  it('Two hotkeyConfigs are equal if have the same description', () => {
    expect(equalsHotkeyConfig(oneHotkeyConfig, oneHotkeyConfig)).toBeTruthy();
    expect(equalsHotkeyConfig(oneHotkeyConfig, twoHotkeyConfig)).toBeFalsy();
  });

  it('by default dynamicHotkeyConfigs is empty', () => {
    const hotkeyStore = new HotkeyStore([oneHotkeyConfig]);
    expect(hotkeyStore.dynamicHotkeyConfigs).toEqual([]);
  })

  it('addHotkeyConfig() add config only to dynamicHotkeyConfigs', () => {
    const hotkeyStore = new HotkeyStore([]);
    hotkeyStore.addHotkeyConfig(oneHotkeyConfig);
    expect(hotkeyStore.defaultHotkeyConfigs).toEqual([]);
    expect(hotkeyStore.dynamicHotkeyConfigs).toEqual([oneHotkeyConfig]);
  });

  it('removeHotkeyConfigs() does not remove defaultHotkeyConfigs', () => {
    const hotkeyStore = new HotkeyStore([oneHotkeyConfig]);
    hotkeyStore.removeHotkeyConfigs(oneHotkeyConfig);
    expect(hotkeyStore.defaultHotkeyConfigs).toEqual([oneHotkeyConfig]);
  });

  it('removeHotkeyConfigs() works correctly', () => {
    const hotkeyStore = new HotkeyStore([oneHotkeyConfig]);

    hotkeyStore.addHotkeyConfig(twoHotkeyConfig);
    expect(hotkeyStore.defaultHotkeyConfigs).toEqual([oneHotkeyConfig]);
    expect(hotkeyStore.dynamicHotkeyConfigs).toEqual([twoHotkeyConfig]);
    
    hotkeyStore.removeHotkeyConfigs(twoHotkeyConfig);
    expect(hotkeyStore.defaultHotkeyConfigs).toEqual([oneHotkeyConfig])
    expect(hotkeyStore.dynamicHotkeyConfigs).toEqual([]);
  });

  it('hotkeyConfigs getter merge configs correctly', () => {
    const hotkeyStore = new HotkeyStore([oneHotkeyConfig]);

    expect(hotkeyStore.hotkeyConfigs).toEqual([oneHotkeyConfig]);

    hotkeyStore.addHotkeyConfig(twoHotkeyConfig);
    expect(hotkeyStore.hotkeyConfigs.sort(compareHotkeyConfigs)).toEqual([oneHotkeyConfig, twoHotkeyConfig].sort(compareHotkeyConfigs));

    hotkeyStore.removeHotkeyConfigs(oneHotkeyConfig);
    expect(hotkeyStore.hotkeyConfigs.sort(compareHotkeyConfigs)).toEqual([oneHotkeyConfig, twoHotkeyConfig].sort(compareHotkeyConfigs));

    hotkeyStore.removeHotkeyConfigs(twoHotkeyConfig);
    expect(hotkeyStore.hotkeyConfigs).toEqual([oneHotkeyConfig]);
  });
});

function compareHotkeyConfigs(oneHotkeyConfig: HotkeyConfig, twoHotkeyConfig: HotkeyConfig) {
  return oneHotkeyConfig.description > twoHotkeyConfig.description ? 1 : -1;
}


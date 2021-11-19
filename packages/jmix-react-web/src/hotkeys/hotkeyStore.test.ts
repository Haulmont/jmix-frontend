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

  it('order of defaultHotkeyConfigs higher priority then dynamicHotkeyConfigs', () => {
    const hotkeyStore = new HotkeyStore([
      {description: '1', hotkey: '1', categoryName: '1'},
      {description: '2', hotkey: '2', categoryName: '2'},
      {description: '3', hotkey: '3', categoryName: '3'},
    ]);

    hotkeyStore.addHotkeyConfig({description: '4', hotkey: '4', categoryName: '4'});
    expect(hotkeyStore.hotkeyConfigs).toEqual([
      {description: '1', hotkey: '1', categoryName: '1'},
      {description: '2', hotkey: '2', categoryName: '2'},
      {description: '3', hotkey: '3', categoryName: '3'},
      {description: '4', hotkey: '4', categoryName: '4'},
    ]);
  });

  it('dynamicHotkeyConfigs redifing defaultHotkeyConfigs', () => {
    const hotkeyStore = new HotkeyStore([
      {description: '1', hotkey: '1', categoryName: '1'},
      {description: '2', hotkey: '2', categoryName: '2'},
      {description: '3', hotkey: '3', categoryName: '3'},
    ]);

    hotkeyStore.addHotkeyConfig({description: '2', hotkey: 'new2', categoryName: 'new2'});
    expect(hotkeyStore.hotkeyConfigs).toEqual([
      {description: '1', hotkey: '1', categoryName: '1'},
      {description: '2', hotkey: 'new2', categoryName: 'new2'},
      {description: '3', hotkey: '3', categoryName: '3'},
    ]);
  })
});

function compareHotkeyConfigs(oneHotkeyConfig: HotkeyConfig, twoHotkeyConfig: HotkeyConfig) {
  return oneHotkeyConfig.description > twoHotkeyConfig.description ? 1 : -1;
}


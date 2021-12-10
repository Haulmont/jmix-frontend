import { Screens } from "./Screens";

describe('Screens', () => {
  let screens: Screens;

  const Component1 = () => 'Component1';
  const screen1 = {
    title: 'screen1',
    key: 'screen1',
    content: Component1,
    screenId: "screen1"
  };
  const Component2 = () => 'Component2';
  const screen2 = {
    title: 'screen2',
    key: 'screen2',
    content: Component2,
    screenId: "screen2"
  };

  beforeEach(() => {
    screens = new Screens();
  });

  it('Screens.setCurrentRootPageData()', () => {
    screens.setCurrentRootPageData('title', 'menuPath');
    expect(screens.currentRootPageData.title).toEqual('title');
    expect(screens.currentRootPageData.menuPath).toEqual('menuPath');
  });

  it('Screens.content()', () => {
    screens.props = {
      children: 'props.children'
    };
    expect(screens.content).toEqual('props.children');

    screens.screens = [screen1, screen2];
    screens.currentScreen = screen2; // TODO Remove currentScreen and save the currentScreenIndex instead
    expect(screens.content).toEqual(Component2);
  });

  it('Screens.closeAll()', () => {
    screens.screens = [screen1, screen2];
    screens.closeAll();
    expect(screens.screens).toEqual([]);
  });

  it('Screens.push()', () => {
    screens.push(screen1);
    expect(screens.screens[0]).toEqual(screen1);
    expect(screens.currentScreen).toEqual(screen1);
    screens.push(screen2);
    expect(screens.screens[0]).toEqual(screen1);
    expect(screens.screens[1]).toEqual(screen2);
    expect(screens.currentScreen).toEqual(screen2);
    expect(screens.currentScreen?.parent).toEqual(screen1);
  });

  describe('Screens.setActiveScreen()', () => {
    it('sets active screen', () => {
      screens.screens = [screen1, screen2];
      screens.setActiveScreen(screen1);
      expect(screens.currentScreen).toEqual(screen1);
      expect(screens.screens).toEqual([screen1, screen2]);
    });

    it('closes screens to the right', () => {
      screens.screens = [screen1, screen2];
      screens.setActiveScreen(screen1, true);
      expect(screens.currentScreen).toEqual(screen1);
      expect(screens.screens).toEqual([screen1]);
    });
  });

});
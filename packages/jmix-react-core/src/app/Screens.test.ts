import { Screens } from "./Screens";

describe('Screens', () => {
  let screens: Screens;

  const Component1 = () => 'Component1';
  const screen1 = {
    title: 'screen1',
    content: Component1
  };
  const Component2 = () => 'Component2';
  const screen2 = {
    title: 'screen2',
    content: Component2
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

    it('saves history', () => {
      const historySpy = jest.spyOn(window.history, 'pushState');
      screens.currentRootPageData.menuPath = 'car';

      screens.setActiveScreen(screen1);
      expect(historySpy).toHaveBeenCalledWith({}, '', 'car');

      const screenA = {
        ...screen1,
        params: {
          entityId: '00000000-0000-0000-0000-000000000000'
        }
      }
      screens.setActiveScreen(screenA);
      expect(historySpy).toHaveBeenCalledWith({}, '', 'car/00000000-0000-0000-0000-000000000000');

      const screenB = {
        ...screen1,
        params: {
          pagination: {
            page: 1,
            pageSize: 20
          }
        }
      };
      screens.setActiveScreen(screenB);
      expect(historySpy).toHaveBeenCalledWith({}, '', 'car?page=1&pageSize=20');
    });
  });

});
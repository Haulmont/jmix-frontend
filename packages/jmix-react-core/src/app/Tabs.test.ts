import { Screens } from "./Screens";
import { Tabs } from "./Tabs";

describe('Tabs core API', () => {
  let tabs: Tabs;

  const Component1a = () => 'Component1a';
  const Component1b = () => 'Component1b';
  const screen1a = {
    title: 'screen1a',
    key: 'screen1a',
    content: Component1a
  };
  const screen1b = {
    title: 'screen1b',
    key: 'screen1b',
    content: Component1b,
    params: {
      entityId: '00000000-0000-0000-0000-000000000000'
    }
  };
  const screens1 = new Screens();
  screens1.push(screen1a);
  screens1.push(screen1b);
  screens1.setCurrentRootPageData('screen1b', 'screen1b');

  const Component2a = () => 'Component2a';
  const Component2b = () => 'Component2b';
  const screen2a = {
    title: 'screen2a',
    key: 'screen2a',
    content: Component2a
  };
  const screen2b = {
    title: 'screen2b',
    key: 'screen2b',
    content: Component2b
  };
  const screens2 = new Screens();
  screens2.push(screen2a);
  screens2.push(screen2b);
  screens2.setCurrentRootPageData('screen2b', 'screen2b');

  const tab1 = {
    title: 'tab1',
    content: () => null,
    key: 'tab1',
    screensInTab: screens1,
    rootScreenId: 'screen1'
  };
  const tab2 = {
    title: 'tab2',
    content: () => null,
    key: 'tab2',
    screensInTab: screens2,
    rootScreenId: 'screen2'
  };

  beforeEach(() => {
    tabs = new Tabs();
    tabs.tabs = [tab1, tab2];
  });

  it('Tabs.closeAll()', () => {
    tabs.closeAll();
    expect(tabs.tabs).toEqual([]);
  });

  it('Tabs.push()', () => {
    const scrollSpy = jest.spyOn(window, 'scrollTo');

    tabs.push(tab1);
    expect(tabs.tabs[0]).toEqual(tab1);
    expect(tabs.currentTab).toEqual(tab1);
    expect(tabs.currentTab.key).toEqual('tab1__0');
    expect(scrollSpy).toHaveBeenCalledWith(0, 0);

    tabs.push(tab2);
    expect(tabs.tabs[0]).toEqual(tab1);
    expect(tabs.tabs[1]).toEqual(tab2);
    expect(tabs.currentTab).toEqual(tab2);
    expect(tabs.currentTab.key).toEqual('tab2__1');
    expect(scrollSpy).toHaveBeenCalledWith(0, 0);
  });

  it('Tabs.close()', () => {
    tabs.tabs = [tab1, tab2];
    tabs.close(tab1);
    expect(tabs.tabs).toEqual([tab2]);

    tabs.tabs = [tab1, tab2];
    tabs.close(tab2);
    expect(tabs.tabs).toEqual([tab1]);
  });

  it('Tabs.setActiveTab()', () => {
    const historySpy = jest.spyOn(window.history, 'pushState');
    const scrollSpy = jest.spyOn(window, 'scrollTo');

    tabs.tabs = [tab1, tab2];
    tabs.currentTab = tab2;
    tabs.setActiveTab(tab1);
    expect(tabs.currentTab).toEqual(tab1);
    expect(historySpy).toHaveBeenCalledWith({}, '', 'screen1b/00000000-0000-0000-0000-000000000000');
    expect(scrollSpy).toHaveBeenCalledWith(0, 0);
  });
});
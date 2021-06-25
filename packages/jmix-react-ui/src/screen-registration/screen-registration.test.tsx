import React from "react";
import {
  openCrudScreen,
  openScreen, registerEntityEditor, registerEntityList, registerScreen,
  ScreenNotFoundError
} from "./screen-registration";
import {getMenuItems, Screens, tabs, getMainStore, ContentDisplayMode} from "@haulmont/jmix-react-core";
import {entityEditorRegistry, entityListRegistry, screenRegistry } from "./registry";
import {singleContentArea} from "../ui/single-content-area/SingleContentAreaState";

jest.mock('@haulmont/jmix-react-core', () => ({
  ...jest.requireActual('@haulmont/jmix-react-core'),
  getMainStore: jest.fn(),
}));

describe('Screen registration', () => {
  global.scrollTo = jest.fn();

  describe('openScreenInTab()', () => {
    afterEach(() => {
      screenRegistry.clear();
      tabs.closeAll();
      tabs.tabsIndex = 0;
      singleContentArea.content = null;
      singleContentArea.screenId = undefined;
    });

    it('throws when screen does not exist', () => {
      expect(
        () => openScreen('non-existent screenId', 'menuLink' )
      ).toThrow(ScreenNotFoundError);
    });

    it('opens screen when it exists, ContentDisplayMode.ActivateExistingTab', () => {
      screenRegistry.set('screenId', {
        caption: 'screenCaption',
        component: () => <div>Component</div>
      });

      // @ts-ignore
      getMainStore.mockReturnValue({
        contentDisplayMode: ContentDisplayMode.ActivateExistingTab
      });

      expect(
        () => openScreen('screenId', 'menuLink' )
      ).not.toThrow();

      expect(tabs.currentTab.title).toEqual('screenCaption');
      expect(tabs.currentTab.key).toEqual('menuLink__0');

      expect(
        () => openScreen('screenId', 'menuLink' )
      ).not.toThrow();

      expect(tabs.currentTab.title).toEqual('screenCaption');
      expect(tabs.currentTab.key).toEqual('menuLink__0');
      expect(tabs.tabs.length).toEqual(1);
      expect(tabs.tabs[0].title).toEqual('screenCaption');

      expect(singleContentArea.screenId).toBeUndefined();
      expect(singleContentArea.content).toBeNull();
    });

    it('opens screen when it exists, ContentDisplayMode.AlwaysNewTab', () => {
      screenRegistry.set('screenId', {
        caption: 'screenCaption',
        component: () => <div>Component</div>
      });

      // @ts-ignore
      getMainStore.mockReturnValue({
        contentDisplayMode: ContentDisplayMode.AlwaysNewTab
      });

      expect(
        () => openScreen('screenId', 'menuLink' )
      ).not.toThrow();

      expect(tabs.currentTab.title).toEqual('screenCaption');
      expect(tabs.currentTab.key).toEqual('menuLink__0');

      expect(
        () => openScreen('screenId', 'menuLink' )
      ).not.toThrow();

      expect(tabs.currentTab.title).toEqual('screenCaption');
      expect(tabs.currentTab.key).toEqual('menuLink__1');
      expect(tabs.tabs.length).toEqual(2);
      expect(tabs.tabs[0].title).toEqual('screenCaption');
      expect(tabs.tabs[0].key).toEqual('menuLink__0');
      expect(tabs.tabs[1].title).toEqual('screenCaption');
      expect(tabs.tabs[1].key).toEqual('menuLink__1');

      expect(singleContentArea.screenId).toBeUndefined();
      expect(singleContentArea.content).toBeNull();
    });

    it('opens screen when it exists, ContentDisplayMode.NoTabs', () => {
      const Component1 = () => <div>Component</div>;
      screenRegistry.set('screenId', {
        caption: 'screenCaption',
        component: Component1
      });
      const Component2 = () => <div>Component2</div>;
      screenRegistry.set('screenId2', {
        caption: 'screenCaption2',
        component: Component2
      });

      // @ts-ignore
      getMainStore.mockReturnValue({
        contentDisplayMode: ContentDisplayMode.NoTabs
      });

      expect(
        () => openScreen('screenId', 'menuLink' )
      ).not.toThrow();

      expect(singleContentArea.screenId).toEqual('screenId');

      expect(
        () => openScreen('screenId2', 'menuLink2' )
      ).not.toThrow();

      expect(singleContentArea.screenId).toEqual('screenId2');

      expect(tabs.tabs.length).toEqual(0);
    });

  });

  describe('openCrudScreen()', () => {
    beforeEach(() => {
      screenRegistry.clear();
      entityListRegistry.clear();
      entityEditorRegistry.clear();
    });

    it('throws when screen does not exist', () => {
      const screens = new Screens();

      expect(
        () => openCrudScreen({
          entityName: 'scr_Car',
          crudScreenType: 'entityList',
          screens,
        })
      ).toThrow(ScreenNotFoundError);

      expect(
        () => openCrudScreen({
          entityName: 'scr_Car',
          crudScreenType: 'entityEditor',
          screens,
        })
      ).toThrow(ScreenNotFoundError);
    });

    it('opens screen when it exists', () => {
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => <div>Car Editor</div>
      });

      screenRegistry.set('CarList', {
        caption: 'Car List',
        component: () => <div>Car List</div>
      });

      entityListRegistry.set('scr_Car', 'CarList');
      entityEditorRegistry.set('scr_Car', 'CarEditor');

      const screens = new Screens();

      expect(
        () => openCrudScreen({
          entityName: 'scr_Car',
          crudScreenType: 'entityList',
          screens,
        })
      ).not.toThrow(ScreenNotFoundError);
      expect(
        () => openCrudScreen({
          entityName: 'scr_Car',
          crudScreenType: 'entityEditor',
          screens,
        })
      ).not.toThrow();

      expect(screens?.screens[0].title).toEqual('Car List');
      expect(screens?.screens[1].title).toEqual('Car Editor');
    });

    it('can pass props to component', () => {
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => <div>Car Editor</div>
      });

      entityEditorRegistry.set('scr_Car', 'CarEditor');
      const screens = new Screens();

      expect(
        () => openCrudScreen({
          entityName: 'scr_Car',
          crudScreenType: 'entityEditor',
          screens,
          props: {
            prop1: 'prop1',
            prop2: 'prop2'
          }
        })
      ).not.toThrow();

      const {props} = screens?.screens[0].content as React.ReactElement;
      expect(props).toBeDefined();
      expect(props.prop1).toEqual('prop1');
      expect(props.prop2).toEqual('prop2');
    });

    it('can pass screenParams', () => {
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => <div>Car Editor</div>
      });

      entityEditorRegistry.set('scr_Car', 'CarEditor');
      const screens = new Screens();

      expect(
        () => openCrudScreen({
          entityName: 'scr_Car',
          crudScreenType: 'entityEditor',
          screens,
          screenParams: {
            entityId: '00000000-0000-0000-0000-000000000000',
            pagination: {
              page: 1,
              pageSize: 20
            }
          }
        })
      ).not.toThrow();

      expect(screens?.screens[0].params?.entityId).toEqual('00000000-0000-0000-0000-000000000000');
      expect(screens?.screens[0].params?.pagination?.page).toEqual(1);
      expect(screens?.screens[0].params?.pagination?.pageSize).toEqual(20);
    });
  });

  describe('registerScreen()', () => {
    beforeEach(() => {
      screenRegistry.clear();
      entityListRegistry.clear();
      entityEditorRegistry.clear();
      getMenuItems().splice(0);
    });

    it('can register a screen', () => {
      registerScreen({
        component: () => null,
        caption: 'Car List',
        screenId: 'CarList',
      });

      expect(screenRegistry.has('CarList')).toEqual(true);
      expect(screenRegistry.get('CarList')?.caption).toEqual('Car List');
    });

    it('can add screen to menu', () => {
      registerScreen({
        component: () => null,
        caption: 'Car List',
        screenId: 'CarList',
        menuOptions: {
          pathPattern: 'car/:entityId?',
          menuLink: 'car'
        }
      });

      expect(getMenuItems()[0]).toEqual({
        pathPattern: 'car/:entityId?',
        menuLink: 'car',
        caption: 'Car List',
        screenId: 'CarList',
      });
    });

    it('can register CRUD screen', () => {
      registerEntityList({
        component: () => null,
        caption: 'Car List',
        screenId: 'CarList',
        entityName: 'scr_Car',
      });

      registerEntityEditor({
        component: () => null,
        caption: 'Car Editor',
        screenId: 'CarEditor',
        entityName: 'scr_Car',
      });

      expect(entityEditorRegistry.has('scr_Car')).toEqual(true);
      expect(entityListRegistry.has('scr_Car')).toEqual(true);

      expect(entityEditorRegistry.get('scr_Car')).toEqual('CarEditor');
      expect(entityListRegistry.get('scr_Car')).toEqual('CarList');
    });
  });

});

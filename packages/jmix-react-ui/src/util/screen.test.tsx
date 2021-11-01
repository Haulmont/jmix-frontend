import { Screens } from "@haulmont/jmix-react-core";
import {openEntityEditorScreen, openEntityListScreen} from "./screen";
import {entityEditorRegistry, entityListRegistry, screenRegistry} from "../screen-registration/registry";
import { message } from "antd";

jest.mock('antd', () => ({
  message: {
    error: () => {
      jest.fn()
    }
  }
}))

describe('Screen opening', () => {
  describe('openEntityEditorScreen()', () => {
    beforeEach(() => {
      screenRegistry.clear();
      entityEditorRegistry.clear();
    });

    it('opens an empty editor screen', () => {
      const screens = new Screens();
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => null
      });
      entityEditorRegistry.set('scr_Car', 'CarEditor');

      openEntityEditorScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK
      });

      expect(screens.screens[0].title).toEqual('Car Editor');
    });

    it('opens editor screen and passes entityInstance', () => {
      const screens = new Screens();
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => null
      });
      entityEditorRegistry.set('scr_Car', 'CarEditor');

      openEntityEditorScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
        entityInstance: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'AAA'
        }
      });

      expect((screens.screens[0].content as React.ReactElement)?.props.entityInstance.id).toEqual('00000000-0000-0000-0000-000000000000');
    });

    it('entityInstance takes precedence when both entityInstance and entityId are provided', () => {
      const consoleWarnSpy = jest.spyOn(console, 'warn');

      const screens = new Screens();
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => null
      });
      entityEditorRegistry.set('scr_Car', 'CarEditor');

      openEntityEditorScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
        entityInstance: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'AAA'
        },
        entityIdToLoad: '00000000-0000-0000-0000-000000000001'
      });

      expect((screens.screens[0].content as React.ReactElement)?.props.entityInstance.id).toEqual('00000000-0000-0000-0000-000000000000');
      expect(screens.screens[0].params).toBeUndefined();
      expect(consoleWarnSpy).toHaveBeenCalledWith('Both entityIdToLoad and entityInstance parameters are provided, entityInstance will take precedence.');
    });

    it('opens editor screen and passes entityIdToLoad', () => {
      const screens = new Screens();
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => null
      });
      entityEditorRegistry.set('scr_Car', 'CarEditor');

      openEntityEditorScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
        entityIdToLoad: '00000000-0000-0000-0000-000000000001'
      });

      expect(screens.screens[0].params?.entityId).toEqual('00000000-0000-0000-0000-000000000001');
    });

    it('passes the props', () => {
      const screens = new Screens();
      screenRegistry.set('CarEditor', {
        caption: 'Car Editor',
        component: () => null
      });
      entityEditorRegistry.set('scr_Car', 'CarEditor');

      const onCommit = () => undefined;

      openEntityEditorScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
        onCommit,
        submitBtnCaption: 'OK',
        hiddenAttributes: ['manufacturer', 'model']
      });

      expect((screens.screens[0].content as React.ReactElement)?.props.onCommit).toEqual(onCommit);
      expect((screens.screens[0].content as React.ReactElement)?.props.submitBtnCaption).toEqual('OK');
      expect((screens.screens[0].content as React.ReactElement)?.props.hiddenAttributes).toEqual(['manufacturer', 'model']);
    });

    it('catches ScreenNotFoundError and displays a message', () => {
      const screens = new Screens();
      const messageErrorSpy = jest.spyOn(message, 'error');

      openEntityEditorScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
      });

      expect(messageErrorSpy).toHaveBeenCalledWith({id: 'editor.doesNotExist'});
    });
  });

  describe('openEntityListScreen()', () => {
    beforeEach(() => {
      screenRegistry.clear();
      entityListRegistry.clear();
    });

    it('opens a screen', () => {
      const screens = new Screens();
      screenRegistry.set('CarList', {
        caption: 'Car List',
        component: () => null
      });
      entityListRegistry.set('scr_Car', 'CarList');

      openEntityListScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
      });

      expect(screens.screens[0].title).toEqual('Car List');
    });

    it('passes props', () => {
      const screens = new Screens();
      screenRegistry.set('CarList', {
        caption: 'Car List',
        component: () => null
      });
      entityListRegistry.set('scr_Car', 'CarList');

      const entityList = [
        {id: '1', name: 'A'},
        {id: '2', name: 'B'},
      ];
      const onEntityListChange = () => undefined;

      openEntityListScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
        entityList,
        onEntityListChange
      });

      expect((screens.screens[0].content as React.ReactElement)?.props.entityList).toEqual(entityList);
      expect((screens.screens[0].content as React.ReactElement)?.props.onEntityListChange).toEqual(onEntityListChange);
    });

    it('catches ScreenNotFoundError and displays a message', () => {
      const screens = new Screens();
      const messageErrorSpy = jest.spyOn(message, 'error');

      openEntityListScreen({
        screens,
        entityName: 'scr_Car',
        intl: INTL_MOCK,
      });

      expect(messageErrorSpy).toHaveBeenCalledWith({id: 'list.doesNotExist'});
    });
  });
});

const INTL_MOCK: any = {
  formatMessage: (msg: string) => msg
}

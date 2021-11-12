import React from 'react';
import {HotkeyContext, useHotkeyStore} from './hotkeyContext';
import {HotkeyStore} from './hotkeyStore';
import { renderHook } from '@testing-library/react-hooks';
import { useHotkey } from './useHotkey';
import { HotkeyConfig } from './hotkeyConfig';
import { act } from 'react-dom/test-utils';

const oneHotkeyConfig: HotkeyConfig = {
  description: 'oneDescription',
  categoryName: 'oneCategoryName',
  hotkey: '/',
};

interface WrapperProps {
  children?: React.ReactNode,
  hotkeyStore: HotkeyStore,
}
const wrapper = ({children, hotkeyStore}: WrapperProps) => (
  <HotkeyContext.Provider value={hotkeyStore}>
    {children}
  </HotkeyContext.Provider>
);

describe('useHotkeys()', () => {
  it('correctly add hotkeyConfig', () => {
    const {result, unmount, rerender} = renderHook(() => {
      useHotkey(oneHotkeyConfig, () => undefined);
      return useHotkeyStore();
    }, {
      wrapper,
      initialProps: {
        hotkeyStore: new HotkeyStore([]),
      }
    });

    expect(result.current.hotkeyConfigs).toEqual([oneHotkeyConfig]);
    rerender();
    expect(result.current.hotkeyConfigs).toEqual([oneHotkeyConfig]);
    unmount();
    expect(result.current.hotkeyConfigs).toEqual([]);
  });

  it('keyboard listener works on the document', async () => {
    const spy = jest.fn();

    renderHook(() => useHotkey(oneHotkeyConfig, spy), {
      wrapper,
      initialProps: {
        hotkeyStore: new HotkeyStore([]),
      }
    });

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 191}));
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('callback is called correctly on component stages', async () => {
    const spy = jest.fn();

    const {rerender, unmount} = renderHook(() => useHotkey(oneHotkeyConfig, spy), {
      wrapper,
      initialProps: {
        hotkeyStore: new HotkeyStore([]),
      }
    });

    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 191}));
    });
    expect(spy).toHaveBeenCalledTimes(1);

    rerender();
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 191}));
    });
    expect(spy).toHaveBeenCalledTimes(2);

    unmount();
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', {keyCode: 191}));
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});

// TODO write tests after rewriting screen-api
xdescribe('useScreenHotkey()', () => {
  xit('works only on own screen', () => undefined);
  xit('correctly add hotkeyConfig on own screen', () => undefined);
  xit('keyboard listener works on the document on own screen', () => undefined);
  xit('callback is called correctly on component stages on own screen', () => undefined);
});

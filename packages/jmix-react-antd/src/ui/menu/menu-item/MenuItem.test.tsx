import React from 'react';
import TestRenderer, { ReactTestRenderer } from 'react-test-renderer';
import { MenuItem } from "./MenuItem";
import VerticalMenu from "../vertical-menu";
import HorizontalMenu from "../horizontal-menu"
import { IntlProvider } from 'react-intl';

describe('MenuItem', () => {

  const menuItemJsx: JSX.Element = (
    <MenuItem
      caption={"item title"}
    >
      <span> item content</span>
    </MenuItem>
  )

  const menuItemWithScreenIdJsx: JSX.Element = (
    <MenuItem
      screenId={"tested"}
      caption={"item title"}
    >
      <span> item title</span>
      <span> item content</span>
    </MenuItem>
  )

  const menuItemWithOnclickJsx: JSX.Element = (
    <MenuItem
      screenId={"tested"}
      // eslint-disable-next-line no-console
      onClick={() => console.log("custom click handler")}
      caption={"item title"}
    >
      <span> item title</span>
      <span> item content</span>
    </MenuItem>
  )

  let menuItemTestRenderer: ReactTestRenderer;
  describe("MenuItem wrapped into VerticalMenu", () => {
    describe('MenuItem with empty props renders without crashing', () => {
      it('MenuItem with empty props render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <IntlProvider locale="en">
              <VerticalMenu>
                {menuItemJsx}
              </VerticalMenu>
            </IntlProvider>
          )
        })
      })

      it('MenuItem with empty props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })

    describe('MenuItem with screenId property renders without crashing', () => {
      it('MenuItem with screenId property render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <IntlProvider locale="en">
              <VerticalMenu>
                {menuItemWithScreenIdJsx}
              </VerticalMenu>
            </IntlProvider>
          )
        })
      })

      it('MenuItem with screenId property unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })

    describe('MenuItem with custom onCLick renders without crashing', () => {
      it('MenuItem with custom onCLick render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <IntlProvider locale="en">
              <VerticalMenu>
                {menuItemWithOnclickJsx}
              </VerticalMenu>
            </IntlProvider>
          )
        })
      })
      it('MenuItem with custom onCLick props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  })

  describe("MenuItem wrapped into HorizontalMenu", () => {
    describe('MenuItem with empty props renders without crashing', () => {
      it('MenuItem with empty props render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <IntlProvider locale="en">
              <HorizontalMenu>
                {menuItemJsx}
              </HorizontalMenu>
            </IntlProvider>
          )
        })
      })

      it('MenuItem with empty props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })

    describe('MenuItem with screenId property renders without crashing', () => {
      it('MenuItem with screenId property render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <IntlProvider locale="en">
              <HorizontalMenu>
                {menuItemWithScreenIdJsx}
              </HorizontalMenu>
            </IntlProvider>
          )
        })
      })

      it('MenuItem with screenId property unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })

    describe('MenuItem with custom onCLick renders without crashing', () => {
      it('MenuItem with custom onCLick render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <IntlProvider locale="en">
              <HorizontalMenu>
                {menuItemWithOnclickJsx}
              </HorizontalMenu>
            </IntlProvider>
          )
        })
      })
      it('MenuItem with custom onCLick props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  })
})

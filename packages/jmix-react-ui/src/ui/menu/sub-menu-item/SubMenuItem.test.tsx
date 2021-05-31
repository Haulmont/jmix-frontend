import React from 'react';
import TestRenderer, {ReactTestRenderer } from 'react-test-renderer';
import {SubMenuItem} from "./SubMenuItem";
import MenuItem from "../menu-item";
import VerticalMenu  from "../vertical-menu";
import HorizontalMenu from "../horizontal-menu"

describe('MenuItem', () => {

  const subMenuItemJsx: JSX.Element = (
      <SubMenuItem
        caption={"test"}
      >
        <span> item title</span>
        <span> item content</span>
      </SubMenuItem>
  )

  const subMenuItemWithEmptyChildrenJsx : JSX.Element = (
      <SubMenuItem
        caption={"test"}
      >
      </SubMenuItem>
  )

  const subMenuItemWithMenuItemsJsx : JSX.Element = (
      <SubMenuItem
        caption={"test"}
      >
        <MenuItem
          caption={<span> item title</span>}
        >
          first tested menu item
        </MenuItem>
        <MenuItem
          caption={<span> item title</span>}
        >
          second tested menu item
        </MenuItem>
      </SubMenuItem>
  )

  const subMenuItemWithSubMenuItemsJsx: JSX.Element = (
    <SubMenuItem
      caption={"test1"}
    >
      <SubMenuItem
        caption={"test2"}
      >
        <SubMenuItem
          caption={"test3"}
        >
          <MenuItem
            caption={<span> item title</span>}
          >
            first tested menu item
          </MenuItem>
          <MenuItem
            caption={<span> item title</span>}
          >
            second tested menu item
          </MenuItem> 
        </SubMenuItem> 
      </SubMenuItem>
  </SubMenuItem>
  )

  let menuItemTestRenderer: ReactTestRenderer;
  describe("SubMenuItem wrapped into VerticalMenu", () => {
    describe('SubMenuItem with empty children renders without crashing', () => {
      it('SubMenuItem with empty children render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <VerticalMenu>
              {subMenuItemWithEmptyChildrenJsx}
            </VerticalMenu>
          )
        })
      })
  
      it('SubMenuItem with empty children unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  
    describe('SubMenuItem with content renders without crashing', () => {
      it('SubMenuItem with content render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <VerticalMenu>
              {subMenuItemJsx}
            </VerticalMenu>
          )
        })
      })
  
      it('SubMenuItem with content unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  
    describe('SubMenuItem with MenuItem renders without crashing', () => {
      it('SubMenuItem with MenuItem render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <VerticalMenu>
              {subMenuItemWithMenuItemsJsx}
            </VerticalMenu>
          )
        })
      })
      it('SubMenuItem with MenuItem props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })

    describe('SubMenuItem with SubMenuItem renders without crashing', () => {
      it('SubMenuItem with SubMenuItem render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <VerticalMenu>
              {subMenuItemWithSubMenuItemsJsx}
            </VerticalMenu>
          )
        })
      })
      it('SubMenuItem with MenuItem  props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  })

  describe("SubMenuItem wrapped into HorizontalMenu", () => {
    describe('SubMenuItem with empty children renders without crashing', () => {
      it('SubMenuItem with empty children render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <HorizontalMenu>
              {subMenuItemWithEmptyChildrenJsx}
            </HorizontalMenu>
          )
        })
      })
  
      it('SubMenuItem with empty children unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  
    describe('SubMenuItem with content renders without crashing', () => {
      it('SubMenuItem with content render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <HorizontalMenu>
              {subMenuItemJsx}
            </HorizontalMenu>
          )
        })
      })
  
      it('SubMenuItem with content unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  
    describe('SubMenuItem with MenuItem renders without crashing', () => {
      it('SubMenuItem with MenuItem render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <HorizontalMenu>
              {subMenuItemWithMenuItemsJsx}
            </HorizontalMenu>
          )
        })
      })
      it('SubMenuItem with MenuItem props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })

    describe('SubMenuItem with SubMenuItem renders without crashing', () => {
      it('SubMenuItem with SubMenuItem render and mount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer = TestRenderer.create(
            <HorizontalMenu>
              {subMenuItemWithSubMenuItemsJsx}
            </HorizontalMenu>
          )
        })
      })
      it('SubMenuItem with MenuItem  props unmount', () => {
        TestRenderer.act(() => {
          menuItemTestRenderer.unmount();
        })
      })
    })
  })
})

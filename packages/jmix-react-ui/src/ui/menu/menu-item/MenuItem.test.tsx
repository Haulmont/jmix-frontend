import React from 'react';
import TestRenderer, {ReactTestRenderer } from 'react-test-renderer';
import {MenuItem} from "./MenuItem";
import VerticalMenu  from "../vertical-menu";
import HorizontalMenu from "../horizontal-menu"

describe('MenuItem', () => {

  const menuItemJsx: JSX.Element = (
      <MenuItem>
        <span> item title</span>
        <span> item content</span>
      </MenuItem>
  )

  const menuItemWithScreenIdJsx : JSX.Element = (
      <MenuItem screenId={"tested"}>
        <span> item title</span>
        <span> item content</span>
      </MenuItem>
  )

  const menuItemWithOnclickJsx : JSX.Element = (
      <MenuItem 
        screenId={"tested"}
        onClick={() => console.log("custom click handler")}
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
            <VerticalMenu>
              {menuItemJsx}
            </VerticalMenu>
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
            <VerticalMenu>
              {menuItemWithScreenIdJsx}
            </VerticalMenu>
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
            <VerticalMenu>
              {menuItemWithOnclickJsx}
            </VerticalMenu>
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
            <HorizontalMenu>
              {menuItemJsx}
            </HorizontalMenu>
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
            <HorizontalMenu>
              {menuItemWithScreenIdJsx}
            </HorizontalMenu>
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
            <HorizontalMenu>
              {menuItemWithOnclickJsx}
            </HorizontalMenu>
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

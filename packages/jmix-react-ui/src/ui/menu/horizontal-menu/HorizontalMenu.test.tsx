import React from 'react';
import TestRenderer, {ReactTestRenderer } from 'react-test-renderer';
import { HorizontalMenu } from "./HorizontalMenu";
import MenuItem from "../menu-item";
import SubMenuItem from "../sub-menu-item";

describe('HorizontalMenu', () => {

  const horizontalMenuJsx: JSX.Element = (
    <HorizontalMenu>
      <MenuItem
        caption={<span> item title</span>}
      >
        <span> first item title</span>
        <span> first item content</span>
      </MenuItem>
      <MenuItem 
        screenId={"secondScreen"}
        caption={<span> item title</span>}
      >
        <span> Second item title</span>
        <span> Second item content</span>
      </MenuItem> 
      <SubMenuItem>
        <MenuItem 
          screenId={"thirdScreen"}
          caption={<span> item title</span>}
        >
          <span> Third item title</span>
          <span> Third item content</span>
        </MenuItem>
        <MenuItem 
          screenId={"fourthScreen"}
          caption={<span> item title</span>}
        >
          <span> Fourth item title</span>
          <span> Fourth item content</span>
        </MenuItem> 
      </SubMenuItem> 
    </HorizontalMenu>
  )

  let horizontalMenuTestRenderer: ReactTestRenderer;

  describe('HorizontalMenu renders without crashing', () => {
    it('HorizontalMenu render and mount', () => {
      TestRenderer.act(() => {
        horizontalMenuTestRenderer = TestRenderer.create(horizontalMenuJsx)
      })
    })

    it('HorizontalMenu unmount', () => {
      TestRenderer.act(() => {
        horizontalMenuTestRenderer.unmount();
      })
    })
  })
})

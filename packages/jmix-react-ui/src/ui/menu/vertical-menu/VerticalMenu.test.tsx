import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { VerticalMenu } from "./VerticalMenu";
import MenuItem from "../menu-item";
import SubMenuItem from "../sub-menu-item";

describe('VerticalMenu', () => {

  const verticalMenuJsx: JSX.Element = (
    <VerticalMenu>
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
      <SubMenuItem
        caption={"test"}
      >
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
    </VerticalMenu>
  )

  let verticalMenuTestRenderer: ReactTestRenderer;

  describe('VerticalMenu renders without crashing', () => {
    it('VerticalMenu render and mount', () => {
      act(() => {
        verticalMenuTestRenderer = create(verticalMenuJsx)
      })
    })

    it('VerticalMenu unmount', () => {
      act(() => {
        verticalMenuTestRenderer.unmount();
      })
    })
  })
})

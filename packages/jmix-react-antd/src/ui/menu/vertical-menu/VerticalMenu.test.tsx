import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { VerticalMenu } from "./VerticalMenu";
import MenuItem from "../menu-item";
import SubMenuItem from "../sub-menu-item";
import { IntlProvider } from 'react-intl';

describe('VerticalMenu', () => {

  const verticalMenuJsx: JSX.Element = (
    <IntlProvider locale="en">
      <VerticalMenu>
        <MenuItem
          caption={"item title"}
        >
          <span> first item title</span>
          <span> first item content</span>
        </MenuItem>
        <MenuItem
          screenId={"secondScreen"}
          caption={"item title"}
        >
          <span> Second item title</span>
          <span> Second item content</span>
        </MenuItem>
        <SubMenuItem
          caption={"test"}
        >
          <MenuItem
            screenId={"thirdScreen"}
            caption={"item title"}
          >
            <span> Third item title</span>
            <span> Third item content</span>
          </MenuItem>
          <MenuItem
            screenId={"fourthScreen"}
            caption={"item title"}
          >
            <span> Fourth item title</span>
            <span> Fourth item content</span>
          </MenuItem>
        </SubMenuItem>
      </VerticalMenu>
    </IntlProvider>

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

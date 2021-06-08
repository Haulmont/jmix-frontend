import React from 'react';
import TestRenderer, { ReactTestRenderer } from 'react-test-renderer';
import { HorizontalMenu } from "./HorizontalMenu";
import MenuItem from "../menu-item";
import SubMenuItem from "../sub-menu-item";
import { IntlProvider } from 'react-intl';

describe('HorizontalMenu', () => {
  const horizontalMenuJsx: JSX.Element = (
    <IntlProvider locale="en">
      <HorizontalMenu>
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
            caption={"item title"}
            screenId={"thirdScreen"}
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
      </HorizontalMenu>
    </IntlProvider>
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

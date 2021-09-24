import {addToScreenRegistryAST} from "./addMvpAppMenu";
import {expect} from "chai";

const PetList = null;

describe('addToScreenRegistryAST', () => {
  it('adds an element successfully', () => {
    const result = addToScreenRegistryAST(INPUT, 'pet-list', 'Pet List', 'PetList');
    expect(result.includes(NEW_KEY_VALUE_PAIR)).to.be.true;
  });
});

const INPUT = `
import { Home } from "./home/Home";
import { ReactComponent } from "../framework/screen-api/ReactComponent";

export interface ScreenInfo {
  /**
   * i18n key for menu item / tab caption
   */
  captionKey: string;
  /**
   * Component that will be rendered in a new tab when menu item is clicked
   */
  component: ReactComponent;
  props?: any;
}

export const screenRegistry: Record<string, ScreenInfo> = {
  home: {
    component: Home,
    captionKey: "screen.home"
  }
  // TODO: delete me
  // 'owner-list': {
  //   component: OwnerList,
  //   captionKey: 'screen.OwnerList',
  // },
};

export function getScreenPaths(): string[] {
  return Object.keys(screenRegistry).map(k => "/" + k);
}
`;

const NEW_KEY_VALUE_PAIR = '"pet-list": "{\\n    componentName: PetList,\\n    captionKey: \'Pet List\'    \\n  }"';
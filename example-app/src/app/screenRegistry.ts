import { ReadOnlyOwnerList } from "./read-only-owner/ReadOnlyOwnerList";
import { PetList } from "./pet/PetList";
import { OwnerList } from "./owner/OwnerList";
import { Home } from "./home/Home";
import { ReactComponent } from "@amplicode/react-core";

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
  // TODO: delete me
  // 'owner-list': {
  //   component: OwnerList,
  //   captionKey: 'screen.OwnerList',
  // },
  home: {
    component: Home,
    captionKey: "screen.home"
  },

  "owner-list": {
    component: OwnerList,
    captionKey: "screen.OwnerList"
  },

  "pet-list": {
    component: PetList,
    captionKey: "screen.PetList"
  },

  "read-only-owner-list": {
    component: ReadOnlyOwnerList,
    captionKey: "screen.ReadOnlyOwnerList"
  }
};

export function getScreenPaths(): string[] {
  return Object.keys(screenRegistry).map(k => "/" + k);
}

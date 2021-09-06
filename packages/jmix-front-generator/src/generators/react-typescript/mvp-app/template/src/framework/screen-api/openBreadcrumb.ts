import { Screens } from "@haulmont/jmix-react-core";
import {ReactComponent} from "./ReactComponent";
import React from "react";

// *** SUBJECT TO CHANGE ***
// Currently depends heavily on Jmix Screen API

export interface OpenBreadcrumbInput {
  component: ReactComponent,
  props?: any,
  title: string,
  /**
   * @deprecated
   */
  screens: Screens
}

export function openBreadcrumb({component, props, title, screens}: OpenBreadcrumbInput) {
  screens.push({
    title,
    content: React.createElement(component, props),
    key: generateKey()
  });
  window.scrollTo(0, 0);
}

function generateKey() {
  // TODO Consider replacing with uuid.v4()
  return String(window.crypto.getRandomValues(new Uint32Array(10))[1]);
}
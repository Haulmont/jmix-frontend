import {ReactComponent} from "@haulmont/jmix-react-core";

export type EntityNamesInfo = {entityName: string, className: string};

export enum ViewerModes {
  Selection = "selection",
  Inspection = 'inspection'
}

export type ScreenItem = {
  component: ReactComponent<any>,
  props: any,
  id: number,
  caption: string
}

export type ScreensControl = {
  openViewerScreen: (props: any, caption: string) => void,
  openEditorScreen: (props: any, caption: string) => void,
  closeActiveScreen: () => void
}

export enum PropsControlTypes {
  Checkbox = 'checkbox',
  Input = "input",
  Radio = "radio",
  Select = "select",
  Textarea = "textarea",
  JsonEditor = 'jsonEditor'
}

export type ControlInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => void;
export type ControlSelectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => void;
export type ControlTextareaHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type ControlJsonHandler = (propName: string, propValue: string) => void;
export type ControlUnionHandler =
  | ControlInputHandler
  | ControlSelectHandler
  | ControlTextareaHandler
  | ControlJsonHandler


type PropsEditItem = {
  controlType: PropsControlTypes,
  data?: any;
}

export type ComponentPreviewProps = {
  [propsName: string]: any
} | null;

export type ToolsPropsModifier = {
  initialProps?: ComponentPreviewProps,
  props?: ComponentPreviewProps,
  propsEditInfo?: PropsEditInfo,
  updateProps?: (updatedProps: ComponentPreviewProps) => void,
} | null;

export type PropsModifier = {
  props: ComponentPreviewProps,
  updateProps: (updatedProps: ComponentPreviewProps) => void
} | null

export type PropsEditInfo = {
  [propsName: string]: PropsEditItem
}

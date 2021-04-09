import {registerComponentPreviews, addComponent, RouteInfo} from "../../../../generators/react-typescript/common/previews-registartion";
import {YeomanGenerator} from "../../../YeomanGenerator";

export function addComponentPreviews(
  gen: YeomanGenerator,
  dirShift: string,
  className: string,
  nameLiteral: string,
  isDefaultExport: boolean = false,
  componentProps?: any,
  registerComponentCallback: (
    routingContents: string,
    routeInfo: RouteInfo,
    componentProps?: any
  ) => string = addComponent
) {
  if (!registerComponentPreviews(gen.fs, {
      componentFileName: className,
      componentClassName: className,
      dirShift: dirShift,
      destRoot: gen.destinationRoot(),
      pathPattern: '/' + nameLiteral
    },
    isDefaultExport,
    componentProps,
    registerComponentCallback
  )) {
    gen.log('Unable to register: route registry not found');
  }
}

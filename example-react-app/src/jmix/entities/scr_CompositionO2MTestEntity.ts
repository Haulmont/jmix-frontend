import { DatatypesTestEntity } from "./scr_DatatypesTestEntity";
import { DeeplyNestedO2MTestEntity } from "./scr_DeeplyNestedO2MTestEntity";
export class CompositionO2MTestEntity {
  static NAME = "scr_CompositionO2MTestEntity";
  id?: string;
  datatypesTestEntity?: DatatypesTestEntity | null;
  quantity?: number | null;
  name?: string | null;
  deeplyNestedO2Mattr?: DeeplyNestedO2MTestEntity[] | null;
}
export type CompositionO2MTestEntityViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "compositionO2MTestEntity-view";
export type CompositionO2MTestEntityView<
  V extends CompositionO2MTestEntityViewName
> = V extends "_base"
  ? Pick<CompositionO2MTestEntity, "id" | "name" | "quantity">
  : V extends "_instance_name"
  ? Pick<CompositionO2MTestEntity, "id" | "name">
  : V extends "_local"
  ? Pick<CompositionO2MTestEntity, "id" | "quantity" | "name">
  : V extends "compositionO2MTestEntity-view"
  ? Pick<
      CompositionO2MTestEntity,
      "id" | "quantity" | "name" | "datatypesTestEntity"
    >
  : never;

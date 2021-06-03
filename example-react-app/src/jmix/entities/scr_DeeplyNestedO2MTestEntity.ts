import { CompositionO2MTestEntity } from "./scr_CompositionO2MTestEntity";
export class DeeplyNestedO2MTestEntity {
  static NAME = "scr_DeeplyNestedO2MTestEntity";
  id?: string;
  name?: string | null;
  compositionO2MTestEntity?: CompositionO2MTestEntity | null;
}
export type DeeplyNestedO2MTestEntityViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type DeeplyNestedO2MTestEntityView<
  V extends DeeplyNestedO2MTestEntityViewName
> = V extends "_base"
  ? Pick<DeeplyNestedO2MTestEntity, "id" | "name">
  : V extends "_instance_name"
  ? Pick<DeeplyNestedO2MTestEntity, "id" | "name">
  : V extends "_local"
  ? Pick<DeeplyNestedO2MTestEntity, "id" | "name">
  : never;

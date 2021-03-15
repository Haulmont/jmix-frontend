export class EmbeddableTestEntity {
  static NAME = "scr_EmbeddableTestEntity";
  name?: string | null;
}
export type EmbeddableTestEntityViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type EmbeddableTestEntityView<
  V extends EmbeddableTestEntityViewName
> = V extends "_base"
  ? Pick<EmbeddableTestEntity, "name">
  : V extends "_local"
  ? Pick<EmbeddableTestEntity, "name">
  : never;

export class HasEmbeddedTestEntity {
  static NAME = "scr_HasEmbeddedTestEntity";
  id?: string;
  embeddableTestEntity?: any | null;
  stringAttr?: string | null;
}
export type HasEmbeddedTestEntityViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "hasEmbeddedTestEntity-fetch-plan";
export type HasEmbeddedTestEntityView<
  V extends HasEmbeddedTestEntityViewName
> = V extends "_base"
  ? Pick<HasEmbeddedTestEntity, "id" | "stringAttr">
  : V extends "_local"
  ? Pick<HasEmbeddedTestEntity, "id" | "stringAttr">
  : V extends "hasEmbeddedTestEntity-fetch-plan"
  ? Pick<HasEmbeddedTestEntity, "id" | "stringAttr" | "embeddableTestEntity">
  : never;

export class TrickyIdTestEntity {
  static NAME = "scr_TrickyIdTestEntity";
  id?: string;
  otherAttr?: string | null;
}
export type TrickyIdTestEntityViewName = "_base" | "_instance_name" | "_local";
export type TrickyIdTestEntityView<
  V extends TrickyIdTestEntityViewName
> = V extends "_base"
  ? Pick<TrickyIdTestEntity, "id" | "otherAttr">
  : V extends "_local"
  ? Pick<TrickyIdTestEntity, "id" | "otherAttr">
  : never;

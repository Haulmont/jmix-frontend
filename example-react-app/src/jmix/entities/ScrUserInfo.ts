import { Car } from "./scr$Car";
export class ScrUserInfo {
  static NAME = "ScrUserInfo";
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  favouriteCars?: Car[] | null;
}
export type ScrUserInfoViewName = "_base" | "_instance_name" | "_local";
export type ScrUserInfoView<V extends ScrUserInfoViewName> = never;

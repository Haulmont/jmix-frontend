import { Car } from "./scr_Car";
import { User } from "./scr_User";
export class FavoriteCar {
  static NAME = "scr_FavoriteCar";
  id?: string;
  car?: Car | null;
  user?: User | null;
  notes?: string | null;
}
export type FavoriteCarViewName =
  | "_base"
  | "_instance_name"
  | "_local"
  | "favoriteCar-edit"
  | "favoriteCar-view";
export type FavoriteCarView<V extends FavoriteCarViewName> = V extends "_base"
  ? Pick<FavoriteCar, "id" | "car" | "notes">
  : V extends "_instance_name"
  ? Pick<FavoriteCar, "id" | "car">
  : V extends "_local"
  ? Pick<FavoriteCar, "id" | "notes">
  : V extends "favoriteCar-edit"
  ? Pick<FavoriteCar, "id" | "notes" | "car" | "user">
  : V extends "favoriteCar-view"
  ? Pick<FavoriteCar, "id" | "notes" | "car" | "user">
  : never;

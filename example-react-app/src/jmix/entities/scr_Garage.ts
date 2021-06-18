import { Car } from "./scr_Car";
import { User } from "./scr_User";
export class Garage {
  static NAME = "scr_Garage";
  id?: string;
  cars?: Car[] | null;
  name?: string | null;
  address?: string | null;
  personnel?: User[] | null;
  capacity?: number | null;
  vanEntry?: boolean | null;
  workingHoursFrom?: any | null;
  workingHoursTo?: any | null;
  currentCars?: Car[] | null;
}
export type GarageViewName = "_base" | "_instance_name" | "_local";
export type GarageView<V extends GarageViewName> = V extends "_base"
  ? Pick<
      Garage,
      | "id"
      | "name"
      | "address"
      | "capacity"
      | "vanEntry"
      | "workingHoursFrom"
      | "workingHoursTo"
    >
  : V extends "_instance_name"
  ? Pick<Garage, "id" | "name">
  : V extends "_local"
  ? Pick<
      Garage,
      | "id"
      | "name"
      | "address"
      | "capacity"
      | "vanEntry"
      | "workingHoursFrom"
      | "workingHoursTo"
    >
  : never;

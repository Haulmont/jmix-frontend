import { CarType, EcoRank } from "../enums/enums";
import { Garage } from "./scr_Garage";
import { TechnicalCertificate } from "./scr_TechnicalCertificate";
export class Car {
  static NAME = "scr_Car";
  id?: string;
  manufacturer?: string | null;
  model?: string | null;
  regNumber?: string | null;
  purchaseDate?: any | null;
  manufactureDate?: any | null;
  wheelOnRight?: boolean | null;
  carType?: CarType | null;
  ecoRank?: EcoRank | null;
  garage?: Garage | null;
  maxPassengers?: number | null;
  price?: any | null;
  mileage?: any | null;
  technicalCertificate?: TechnicalCertificate | null;
  version?: number | null;
  createdBy?: string | null;
  createdDate?: any | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: any | null;
  photo?: any | null;
}
export type CarViewName = "_base" | "_instance_name" | "_local" | "car-edit";
export type CarView<V extends CarViewName> = V extends "_base"
  ? Pick<
      Car,
      | "id"
      | "manufacturer"
      | "model"
      | "regNumber"
      | "purchaseDate"
      | "manufactureDate"
      | "wheelOnRight"
      | "carType"
      | "ecoRank"
      | "maxPassengers"
      | "price"
      | "mileage"
      | "version"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "photo"
    >
  : V extends "_instance_name"
  ? Pick<Car, "id" | "manufacturer" | "model">
  : V extends "_local"
  ? Pick<
      Car,
      | "id"
      | "manufacturer"
      | "model"
      | "regNumber"
      | "purchaseDate"
      | "manufactureDate"
      | "wheelOnRight"
      | "carType"
      | "ecoRank"
      | "maxPassengers"
      | "price"
      | "mileage"
      | "version"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "photo"
    >
  : V extends "car-edit"
  ? Pick<
      Car,
      | "id"
      | "manufacturer"
      | "model"
      | "regNumber"
      | "purchaseDate"
      | "manufactureDate"
      | "wheelOnRight"
      | "carType"
      | "ecoRank"
      | "maxPassengers"
      | "price"
      | "mileage"
      | "version"
      | "createdBy"
      | "createdDate"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "photo"
      | "garage"
      | "technicalCertificate"
    >
  : never;

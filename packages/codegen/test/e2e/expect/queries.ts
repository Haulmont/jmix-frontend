import { JmixRestConnection, FetchOptions, SerializedEntity, EntitiesWithCount } from "@haulmont/jmix-rest";

import { Car } from "./entities/scr$Car";

import { FavoriteCar } from "./entities/scr$FavoriteCar";

export type queries_Car_ecoCars_params =
  | {}
  | {
      ecoRank: string;
    }
  | {
      model: string;
    };

export type queries_Car_carsByType_params = {
  carType: string;
};

export type queries_FavoriteCar_allCars_params = {
  car: Car;
};

export var restQueries = {
  Car: {
    allCars: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (): Promise<SerializedEntity<Car>[]> => {
      return cubaApp.query<Car>("scr$Car", "allCars", {}, fetchOpts);
    },
    allCarsCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (): Promise<Number> => {
      return cubaApp.queryCount("scr$Car", "allCars", {}, fetchOpts);
    },
    allCarsWithCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (): Promise<EntitiesWithCount<Car>> => {
      return cubaApp.queryWithCount<Car>("scr$Car", "allCars", {}, fetchOpts);
    },
    ecoCars: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_Car_ecoCars_params
    ): Promise<SerializedEntity<Car>[]> => {
      return cubaApp.query<Car>("scr$Car", "ecoCars", params, fetchOpts);
    },
    ecoCarsCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_Car_ecoCars_params
    ): Promise<Number> => {
      return cubaApp.queryCount("scr$Car", "ecoCars", params, fetchOpts);
    },
    ecoCarsWithCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_Car_ecoCars_params
    ): Promise<EntitiesWithCount<Car>> => {
      return cubaApp.queryWithCount<Car>("scr$Car", "ecoCars", params, fetchOpts);
    },
    carsByType: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_Car_carsByType_params
    ): Promise<SerializedEntity<Car>[]> => {
      return cubaApp.query<Car>("scr$Car", "carsByType", params, fetchOpts);
    },
    carsByTypeCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_Car_carsByType_params
    ): Promise<Number> => {
      return cubaApp.queryCount("scr$Car", "carsByType", params, fetchOpts);
    },
    carsByTypeWithCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_Car_carsByType_params
    ): Promise<EntitiesWithCount<Car>> => {
      return cubaApp.queryWithCount<Car>("scr$Car", "carsByType", params, fetchOpts);
    }
  },
  FavoriteCar: {
    allCars: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_FavoriteCar_allCars_params
    ): Promise<SerializedEntity<FavoriteCar>[]> => {
      return cubaApp.query<FavoriteCar>("scr$FavoriteCar", "allCars", params, fetchOpts);
    },
    allCarsCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_FavoriteCar_allCars_params
    ): Promise<Number> => {
      return cubaApp.queryCount(
        "scr$FavoriteCar",
        "allCars",
        params,
        fetchOpts
      );
    },
    allCarsWithCount: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: queries_FavoriteCar_allCars_params
    ): Promise<EntitiesWithCount<FavoriteCar>> => {
      return cubaApp.queryWithCount<FavoriteCar>(
        "scr$FavoriteCar",
        "allCars",
        params,
        fetchOpts
      );
    }
  }
};

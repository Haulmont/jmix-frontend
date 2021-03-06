import { JmixRestConnection, FetchOptions } from "@haulmont/jmix-rest";

import { Car } from "./entities/scr$Car";

import { CarType } from "./enums/enums";

export type scr_FavoriteService_addFavorite_params =
  | {
      car: Car;
      notes: string;
    }
  | {
      favInfo: any;
    }
  | {
      carId: string;
      notes: string;
    };

export type scr_FavoriteService_getFavoritesByType_params = {
  carType: CarType;
};

export var restServices = {
  scr_FavoriteService: {
    addFavorite: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: scr_FavoriteService_addFavorite_params
    ) => {
      return cubaApp.invokeService(
        "scr_FavoriteService",
        "addFavorite",
        params,
        fetchOpts
      );
    },
    getFavorites: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "scr_FavoriteService",
        "getFavorites",
        {},
        fetchOpts
      );
    },
    getFavoritesByType: (cubaApp: JmixRestConnection, fetchOpts?: FetchOptions) => (
      params: scr_FavoriteService_getFavoritesByType_params
    ) => {
      return cubaApp.invokeService(
        "scr_FavoriteService",
        "getFavoritesByType",
        params,
        fetchOpts
      );
    }
  }
};
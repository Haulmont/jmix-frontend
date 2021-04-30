import { Car } from "./scr$Car";
export class Product {
  static NAME = "scr_Product";
  id?: string;
  car?: Car | null;
  price?: any | null;
  special?: boolean | null;
}
export type ProductViewName = "_base" | "_instance_name" | "_local";
export type ProductView<V extends ProductViewName> = V extends "_base"
  ? Pick<Product, "id" | "price" | "special">
  : V extends "_local"
  ? Pick<Product, "id" | "price" | "special">
  : never;

import { Product } from "./scr_Product";
import { Order } from "./scr_Order";
export class OrderLine {
  static NAME = "scr_OrderLine";
  id?: string;
  product?: Product | null;
  quantity?: number | null;
  order?: Order | null;
}
export type OrderLineViewName = "_base" | "_instance_name" | "_local";
export type OrderLineView<V extends OrderLineViewName> = V extends "_base"
  ? Pick<OrderLine, "id" | "quantity">
  : V extends "_local"
  ? Pick<OrderLine, "id" | "quantity">
  : never;

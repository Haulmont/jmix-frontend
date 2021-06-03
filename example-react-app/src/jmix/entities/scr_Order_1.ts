export class Order {
  static NAME = "scr_Order_1";
  id?: string;
}
export type OrderViewName = "_base" | "_instance_name" | "_local";
export type OrderView<V extends OrderViewName> = never;

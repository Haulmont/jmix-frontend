import { OrderLine } from "./scr_OrderLine";
import { Customer } from "./scr_Customer";
export class Order {
  static NAME = "scr_Order";
  id?: string;
  date?: any | null;
  lines?: OrderLine[] | null;
  amount?: any | null;
  customer?: Customer | null;
}
export type OrderViewName = "_base" | "_instance_name" | "_local";
export type OrderView<V extends OrderViewName> = V extends "_base"
  ? Pick<Order, "id" | "date" | "amount">
  : V extends "_local"
  ? Pick<Order, "id" | "date" | "amount">
  : never;

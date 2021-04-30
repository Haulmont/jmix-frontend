export class Customer {
  static NAME = "scr_Customer";
  id?: string;
  name?: string | null;
  email?: string | null;
}
export type CustomerViewName = "_base" | "_instance_name" | "_local";
export type CustomerView<V extends CustomerViewName> = V extends "_base"
  ? Pick<Customer, "id" | "name" | "email">
  : V extends "_instance_name"
  ? Pick<Customer, "id" | "name">
  : V extends "_local"
  ? Pick<Customer, "id" | "name" | "email">
  : never;

export class CarDto {
  static NAME = "scr_CarDto";
  id?: string;
  manufacturer?: string | null;
  price?: any | null;
  model?: string | null;
}
export type CarDtoViewName = "_base" | "_instance_name" | "_local";
export type CarDtoView<V extends CarDtoViewName> = never;

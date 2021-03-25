import { FormWizardAssociationO2OTestEntity } from "./scr_FormWizardAssociationO2OTestEntity";
import { FormWizardCompositionO2OTestEntity } from "./scr_FormWizardCompositionO2OTestEntity";
export class FormWizardTestEntity {
  static NAME = "scr_FormWizardTestEntity";
  id?: string;
  notNull?: string | null;
  associationO2O?: FormWizardAssociationO2OTestEntity | null;
  date?: any | null;
  time?: any | null;
  integer?: number | null;
  compositionO2O?: FormWizardCompositionO2OTestEntity | null;
}
export type FormWizardTestEntityViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type FormWizardTestEntityView<
  V extends FormWizardTestEntityViewName
> = V extends "_base"
  ? Pick<FormWizardTestEntity, "id" | "notNull" | "date" | "time" | "integer">
  : V extends "_local"
  ? Pick<FormWizardTestEntity, "id" | "notNull" | "date" | "time" | "integer">
  : never;

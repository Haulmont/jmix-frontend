import { FormWizardTestEntity } from "./scr_FormWizardTestEntity";
export class FormWizardAssociationO2OTestEntity {
  static NAME = "scr_FormWizardAssociationO2OTestEntity";
  id?: string;
  name?: string | null;
  formWizardTestEntity?: FormWizardTestEntity | null;
}
export type FormWizardAssociationO2OTestEntityViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type FormWizardAssociationO2OTestEntityView<
  V extends FormWizardAssociationO2OTestEntityViewName
> = V extends "_base"
  ? Pick<FormWizardAssociationO2OTestEntity, "id" | "name">
  : V extends "_local"
  ? Pick<FormWizardAssociationO2OTestEntity, "id" | "name">
  : never;

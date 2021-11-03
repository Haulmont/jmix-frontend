export class FormWizardCompositionO2OTestEntity {
  static NAME = "scr_FormWizardCompositionO2OTestEntity";
  id?: string;
  name?: string | null;
}
export type FormWizardCompositionO2OTestEntityViewName =
  | "_base"
  | "_instance_name"
  | "_local";
export type FormWizardCompositionO2OTestEntityView<
  V extends FormWizardCompositionO2OTestEntityViewName
> = V extends "_base"
  ? Pick<FormWizardCompositionO2OTestEntity, "id" | "name">
  : V extends "_local"
  ? Pick<FormWizardCompositionO2OTestEntity, "id" | "name">
  : never;

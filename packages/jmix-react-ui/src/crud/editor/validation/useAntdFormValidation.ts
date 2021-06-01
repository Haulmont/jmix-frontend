import { FormInstance } from "antd";
import {JmixServerValidationErrors} from "../../../common/JmixServerValidationErrors";
import {FieldData} from "rc-field-form/es/interface";

export function useAntdFormValidation(form: FormInstance, errorInfo?: JmixServerValidationErrors) {
  if (errorInfo == null || errorInfo?.fieldErrors == null) {
    return;
  }

  const fieldsPartial: FieldData[] = [];
  errorInfo?.fieldErrors.forEach((messages: string[], path: string) => {
    fieldsPartial.push({
      name: path,
      errors: messages
    });
  });

  // Put the error messages into the form
  form.setFields(fieldsPartial);
}
import { FormInstance } from "antd";
import {JmixServerValidationErrors} from "../../../common/JmixServerValidationErrors";
import {FieldData} from "rc-field-form/es/interface";
import {IntlShape, useIntl } from "react-intl";

export function useAntdFormValidation(form: FormInstance, errorInfo?: JmixServerValidationErrors) {
  const intl = useIntl();

  if (errorInfo == null || errorInfo?.fieldErrors == null) {
    return;
  }

  const fieldsPartial: FieldData[] = [];
  errorInfo?.fieldErrors.forEach((messages: string[], path: string) => {
    if (path.includes('.')) {
      addChildEntityError(fieldsPartial, path, intl);
      return;
    }

    fieldsPartial.push({
      name: path,
      errors: messages
    });
  });

  // Put the error messages into the form
  form.setFields(fieldsPartial);
}

/**
 * Adds "Validation error in child entity" message on a Composition field
 * if it isn't already there.
 *
 * @param fieldsPartial
 * @param path
 * @param intl
 */
function addChildEntityError(fieldsPartial: FieldData[], path: string, intl: IntlShape) {
  const childErrorMessage = intl.formatMessage({id: 'jmix.form.validation.childError'});

  const fieldName = path.split('.')[0];

  if (!fieldsPartial.some(f => f.name === fieldName)) {
    fieldsPartial.push({
      name: fieldName,
      errors: []
    })
  }

  const fieldIndex = fieldsPartial.findIndex(f => f.name === fieldName);

  if (fieldsPartial[fieldIndex].errors == null) {
    fieldsPartial[fieldIndex].errors = [];
  }

  if (!fieldsPartial[fieldIndex].errors!.some(e => e === childErrorMessage)) {
    fieldsPartial[fieldIndex].errors!.push(childErrorMessage);
  }
}

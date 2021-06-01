import { FormInstance } from "antd";
import {useAntdFormValidation} from "./useAntdFormValidation";

export function createUseAntdFormValidation(form: FormInstance) {
  return useAntdFormValidation.bind(null, form);
}
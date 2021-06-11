import { FormInstance } from "antd";
import { useCallback } from "react";

export function useCreateAntdResetForm(form: FormInstance): () => void {
  return useCallback(() => form.resetFields(), [form]);
}

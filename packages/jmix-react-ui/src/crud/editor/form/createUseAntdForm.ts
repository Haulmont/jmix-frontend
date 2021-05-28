import { EntityInstance } from "@haulmont/jmix-react-core";
import { FormInstance } from "antd";
import { useAntdForm } from "./useAntdForm";

export function createUseAntdForm<TEntity>(form: FormInstance): (item: EntityInstance<TEntity>, entityName: string) => void {
  return useAntdForm.bind(null, form);
}
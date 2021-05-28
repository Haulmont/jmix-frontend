import { EntityInstance, useMetadata } from "@haulmont/jmix-react-core";
import {useEffect} from "react";
import {jmixFront_to_ant} from "../../../formatters/jmixFront_to_ant";
import {FormInstance} from "antd";

export function useAntdForm<TEntity>(form: FormInstance, item: EntityInstance<TEntity>, entityName: string) {
  const metadata = useMetadata();

  useEffect(() => {
    if (item != null && metadata != null) {
      form.setFieldsValue(
        jmixFront_to_ant<TEntity>(item, entityName, metadata)
      );
    }
  }, [form, item, metadata, entityName]);
}
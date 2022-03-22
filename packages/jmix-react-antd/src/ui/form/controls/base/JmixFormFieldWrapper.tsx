import {FieldPermissionContainer} from "@haulmont/jmix-react-web";
import {Form, FormItemProps} from "antd";
import * as React from "react";
import {useMetadata, MetaClassInfo, useMainStore} from "@haulmont/jmix-react-core";
import {passthroughRule} from "../../validation/passthroughRule";
import {getDefaultFormItemProps} from "../../Form";
import {useContext} from "react";
import {EntityNameContext} from "../../entity-form/EntityForm";
import { EntityMessages } from "@haulmont/jmix-rest";

export interface JmixFormFieldWrapperProps {
  entityName?: string;
  propertyName: string;
  formItemProps?: FormItemProps;
  renderField: (isReadOnly: boolean) => React.ReactNode;
}

export function JmixFormFieldWrapper({entityName: entityNameProp, propertyName, formItemProps, renderField}: JmixFormFieldWrapperProps) {
  const metadata = useMetadata();
  const mainStore = useMainStore()

  const entityNameFromContext = useContext(EntityNameContext);
  const entityName = entityNameProp ?? entityNameFromContext;
  if (entityName == null) {
    throw new Error('entityName is not provided in either prop or context');
  }

  const mergedFormItemProps = mergeWithDefaultFormItemProps(metadata.entities, entityName, propertyName, mainStore?.messages, formItemProps);

  return (
    <FieldPermissionContainer entityName={entityName} propertyName={propertyName} renderField={(isReadOnly: boolean) => {
      return (
        <Form.Item {...mergedFormItemProps}>
          {renderField(isReadOnly)}
        </Form.Item>
      );
    }}/>
  );
}

function mergeWithDefaultFormItemProps<FormItemProps = Record<string, any>>(
  entityMetaInfo: MetaClassInfo[],
  entityName: string,
  propertyName: string,
  messages: EntityMessages | null,
  formItemProps?: FormItemProps,
) {
  const defaults = getDefaultFormItemProps(entityMetaInfo, entityName, propertyName, messages);
  const merged = {...defaults, ...formItemProps};

  // TypeScript doesn't know whether `rules` is defined
  if (merged.rules == null) {
    merged.rules = [];
  }

  // Add a passthrough rule. This will clear server-side errors on `validateTrigger` without having to manually set errors on fields.
  merged.rules.push(passthroughRule);

  return merged;
}
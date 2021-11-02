import {FieldPermissionContainer} from "@haulmont/jmix-react-web";
import {Form, FormItemProps} from "antd";
import * as React from "react";
import {useMetadata, MetaClassInfo} from "@haulmont/jmix-react-core";
import {passthroughRule} from "../../validation/passthroughRule";
import {getDefaultFormItemProps} from "../../Form";

export interface JmixFormFieldWrapperProps {
  entityName: string;
  propertyName: string;
  formItemProps?: FormItemProps;
  renderField: (isReadOnly: boolean) => React.ReactNode;
}

export function JmixFormFieldWrapper({entityName, propertyName, formItemProps, renderField}: JmixFormFieldWrapperProps) {
  const metadata = useMetadata();

  const mergedFormItemProps = mergeWithDefaultFormItemProps(metadata.entities, entityName, propertyName, formItemProps);

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
  formItemProps?: FormItemProps,
) {
  const defaults = getDefaultFormItemProps(entityMetaInfo, entityName, propertyName);
  const merged = {...defaults, ...formItemProps};

  // TypeScript doesn't know whether `rules` is defined
  if (merged.rules == null) {
    merged.rules = [];
  }

  // Add a passthrough rule. This will clear server-side errors on `validateTrigger` without having to manually set errors on fields.
  merged.rules.push(passthroughRule);

  return merged;
}
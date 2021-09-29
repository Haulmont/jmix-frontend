import React from "react";
import { 
  FieldProps, 
  getDefaultFormItemProps, 
  passthroughRule 
} from "@haulmont/jmix-react-antd";
import { FieldPermissionContainer } from "@haulmont/jmix-react-web";
import { MayHaveId, MetaPropertyInfo, useMetadata, Cardinality } from "@haulmont/jmix-react-core";
import { EntityNamesInfo, ScreensControl } from "../../EntityInspector.types";
import { Form } from "antd";
import { observer } from "mobx-react";
import { CompositionO2O } from "./composition-o2o";
import {CompositionO2M} from "./composition-o2m";

type CompositionFieldProps = Omit<FieldProps, 'componentProps'> & {
  compositionType: Cardinality
  componentProps?: CompositionComponentProps
} 
export interface CompositionComponentProps {
  onChange?: (value?: this['value']) => void;
  value?: MayHaveId | MayHaveId[],
  screensControl: ScreensControl,
  parentEntityName: string,
  routingPath: string,
  entityNamesInfo: EntityNamesInfo,
  attrInfo: MetaPropertyInfo
}

export const CompositionField = observer((props: CompositionFieldProps) => {

  const {
    entityName, 
    propertyName, 
    componentProps,
    disabled, 
    formItemProps,
    compositionType
  } = props;

  const metadata = useMetadata();

  const combinedFormItemProps = {...getDefaultFormItemProps(metadata.entities, entityName, propertyName), ...formItemProps};
  if (combinedFormItemProps.rules == null) {
    combinedFormItemProps.rules = [];
  }
  // Add a passthrough rule. This will clear server-side errors on `validateTrigger` without having to manually set errors on fields.
  combinedFormItemProps.rules.push(passthroughRule);


  return (
    <FieldPermissionContainer entityName={entityName} propertyName={propertyName} renderField={(isReadOnly: boolean) => {
      const compositionComponentProps = {...componentProps, disabled: disabled || isReadOnly} as CompositionComponentProps
      return (
        <Form.Item 
          {...combinedFormItemProps}
        >
          {renderCompositionComponent(compositionType, compositionComponentProps)}
        </Form.Item>
      )

    }}/>);

});

function renderCompositionComponent(
  compositionType: Cardinality,
  props: CompositionComponentProps
) {
  switch(compositionType) {
    case "ONE_TO_ONE": return <CompositionO2O {...props}/>;
    case "ONE_TO_MANY": return <CompositionO2M {...props}/>;
    default: return null;
  }
}

import React from "react";
import { 
  EntityInstance, 
  HasId, 
  isAssociation, 
  isComposition, 
  isToOneAssociation, 
  MayHaveInstanceName, 
  MetaPropertyInfo, 
  useMetadata 
} from "@haulmont/jmix-react-core";
import {Field} from "@haulmont/jmix-react-antd";
import { ScreensControl } from "../../EntityInspector.types";
import { 
  getAllEntityPropertyNames, 
  getAllPersistentEntityNames, 
  getEntityNamesInfo 
} from "../../EntityInspector.helpers";
import { CompositionField } from "../composition-field";
import { Association2O } from "../association-2o";

interface Props {
  entityAttrsInfo: MetaPropertyInfo[],
  entityName: string,
  routingPath: string,
  screensControl: ScreensControl,
  onEntitySelectFactory: (attrName: string) => (value: string) => void,
  relationOptions?: Map<string, EntityInstance<unknown, HasId, MayHaveInstanceName>[]>
}

export const Fields = (props: Props) => {

  const {
    entityAttrsInfo,
    entityName,
    routingPath,
    screensControl,
    onEntitySelectFactory,
    relationOptions
  } = props;

  const metadata = useMetadata();
  
  return (
    <>
      {entityAttrsInfo
        .filter(attrInfo =>  attrInfo.type !== "fileRef" && attrInfo.name !== "id")
        .map((attrInfo) => {
          const entityAttrs =getAllEntityPropertyNames(attrInfo.type, metadata)!;
          const entityNamesInfo = getEntityNamesInfo(getAllPersistentEntityNames(metadata), attrInfo.type);

          if(isToOneAssociation(attrInfo)) {
            return (
              <Association2O
                attrInfo={attrInfo}
                routingPath={routingPath}
                entityName={entityName}
                onEntitySelectFactory={onEntitySelectFactory}
                screensControl={screensControl}
                relationOptions={relationOptions}
                entityAttrs={entityAttrs}
                entityNamesInfo={entityNamesInfo}
                key={attrInfo.name}
              />
            )
          }

          if(isComposition(attrInfo)) {
            return (
              <CompositionField
                compositionType={attrInfo.cardinality}
                entityName={entityName}
                propertyName={attrInfo.name}
                formItemProps={{
                  rules: attrInfo.mandatory ? [{required: true}] : undefined,
                }}
                componentProps={{
                  routingPath,
                  screensControl,
                  entityNamesInfo,
                  parentEntityName: entityName,
                  attrInfo,
                }}
                key={attrInfo.name}
              />
            )
          }
          return (
            <Field
              entityName={entityName}
              propertyName={attrInfo.name}
              associationOptions={isAssociation(attrInfo) ? relationOptions?.get(attrInfo.type) : undefined}
              disabled={attrInfo.readOnly}
              formItemProps={{
                rules: attrInfo.mandatory ? [{required: true}] : undefined,
                valuePropName: attrInfo.type === "Boolean" ? "checked" : undefined
              }}
              key={attrInfo.name}
            />
          )
      })}
    </>
  )
}

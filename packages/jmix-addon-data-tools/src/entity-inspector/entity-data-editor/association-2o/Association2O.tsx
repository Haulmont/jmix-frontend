import { DashOutlined } from "@ant-design/icons";
import { EntityInstance, HasId, MayHaveInstanceName, MetaPropertyInfo } from "@haulmont/jmix-react-core";
import { Field } from "@haulmont/jmix-react-antd";
import React, { useCallback, useMemo } from "react";
import { EntityNamesInfo, ScreensControl, ViewerModes } from "../../EntityInspector.types";
import styles from "./Association2O.less";

interface Props {
  attrInfo: MetaPropertyInfo,
  routingPath: string,
  entityName: string,
  onEntitySelectFactory: (attrName: string) => (value: string) => void,
  screensControl: ScreensControl,
  relationOptions?: Map<string, EntityInstance<unknown, HasId, MayHaveInstanceName>[]>,
  entityAttrs: string[],
  entityNamesInfo: EntityNamesInfo
}

export const Association2O = (props: Props) => {
  const {
    attrInfo, 
    entityName, 
    onEntitySelectFactory, 
    screensControl, 
    relationOptions,
    entityAttrs,
    entityNamesInfo,
    routingPath
  } = props;
  
  const {openViewerScreen} = screensControl

  const onEntitySelect = useMemo(() => {
    return onEntitySelectFactory(attrInfo.name);
  }, [attrInfo, onEntitySelectFactory]);

  const onPickerBtn = useCallback(() => {
    openViewerScreen({
      onEntitySelect,
      mode: ViewerModes.Selection,
      screensControl,
      entityAttrs,
      entityNamesInfo,
      routingPath
    }, `${attrInfo.type} view`)
  }, [onEntitySelect, screensControl, entityAttrs, entityNamesInfo, routingPath]);

  return (
    <div 
      className={styles['association-field-container']} 
    >
        <div className={styles['association-field-wrapper']}>
          <Field
            entityName={entityName}
            propertyName={attrInfo.name}
            associationOptions={relationOptions?.get(attrInfo.type)}
            formItemProps={{
              rules: attrInfo.mandatory ? [{required: true}] : undefined,
            }}
          />
        </div>
        <DashOutlined
          className={styles['entity-picker-icon']}
          onClick={onPickerBtn}
        />
    </div>
  )
}

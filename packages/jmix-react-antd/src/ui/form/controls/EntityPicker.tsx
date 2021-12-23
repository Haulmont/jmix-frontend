import {Input} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import React, {useCallback, useMemo} from "react";
import {useIntl} from "react-intl";
import {
  getPropertyInfo, 
  useMetadata, 
  useScreens,
  isOneToOneRelation,
  isManyToOneRelation,
  isAssociation,
  HasId,
  MayHaveInstanceName,
  MetaPropertyInfo
} from "@haulmont/jmix-react-core";
import {getEntityInstanceById, openCrudScreen} from "@haulmont/jmix-react-web";
import { notifications, NotificationType } from "../../notifications";

export interface EntityPickerProps {
  entityName: string,
  propertyName: string,
  value?: string;
  onChange?: (value: this['value']) => void;
  disabled?: boolean;
  associationOptions?: Array<HasId & MayHaveInstanceName>;
}

export function EntityPicker(props: EntityPickerProps) {
  const {
    value, 
    entityName,
    onChange,
    disabled,
    propertyName,
    associationOptions
  } = props;

  const screens = useScreens();
  const intl = useIntl();
  const metadata = useMetadata();

  const propertyInfo = useMemo(() => {
    return getPropertyInfo(metadata.entities, entityName, propertyName);
  }, [metadata.entities, entityName, propertyName]);

  if(propertyInfo == null) {
    throw new Error(`Metadata not found for property ${propertyName} of entity ${entityName}`);
  }

  const isCorrectField = useMemo(() => {
    return isToOneAssociation(propertyInfo)
  }, [propertyInfo]);

  if(!isCorrectField) {
    throw new Error(`property must be a to-one association`);
  }

  const displayedValue = useMemo(() => {
    return value != null
      ? getDisplayedValue(value, associationOptions)
      : undefined
  }, [value, associationOptions])

  const onSelectEntity = useCallback((entityInstance?: Record<string, unknown>) => {
      if (onChange != null) {
        const newValue = entityInstance?._instanceName != null
          ? entityInstance._instanceName as string
          : undefined

        onChange(newValue);
      }
    }, [onChange]);

  const handleClick = useCallback(() => {
    try{
      openCrudScreen({
        entityName: propertyInfo.type,
        crudScreenType: "entityList",
        screens,
        props: {
          onSelectEntity
        }
      })
    } catch(_e) {
      notifications.show({
        type: NotificationType.ERROR,
        description: intl.formatMessage({ id: "common.openScreenError" }, {entityName: propertyInfo.type})
      });
    }
  }, [intl, screens, onSelectEntity, propertyInfo.type]);

  return (
    <Input 
      prefix={<LinkOutlined />}
      readOnly={true}
      onClick={handleClick}
      value={displayedValue}
      disabled={disabled}
      id={propertyName}
    />
  );
}

function getDisplayedValue(
  value: string, 
  associationOptions: Array<HasId & MayHaveInstanceName> = []
) {
  let entityInstance;
  try {
    entityInstance = getEntityInstanceById(value, associationOptions);
    return entityInstance._instanceName ?? value;
  } catch(_e) {
    return value;
  }
}

function isToOneAssociation(propertyInfo: MetaPropertyInfo) {
  return isAssociation(propertyInfo) 
    && (isOneToOneRelation(propertyInfo) || isManyToOneRelation(propertyInfo))
}

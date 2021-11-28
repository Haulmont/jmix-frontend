import {Input} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import React, {useCallback, useMemo} from "react";
import {useIntl} from "react-intl";
import {useScreens} from "@haulmont/jmix-react-core";
import {openCrudScreen} from "@haulmont/jmix-react-web";
import { notifications, NotificationType } from "../../notifications";

export interface EntityPickerProps {
  entityName: string,
  propertyName: string,
  value?: Record<string, unknown>;
  onChange?: (value: this['value']) => void;
  transformValue?: (value: Record<string, unknown>) => string;
  label?: string;
  disabled?: boolean;
}

export function EntityPicker(props: EntityPickerProps) {
  const {
    value, 
    entityName,
    transformValue,
    onChange,
    disabled,
    propertyName
  } = props;

  const screens = useScreens();
  const intl = useIntl();

  const inputValue = useMemo(() => {
    return value
      ? transformValue
        ? transformValue(value)
        : (value?.[propertyName] ?? "") as string
      : ""
  }, [value, transformValue, propertyName]);

  const onSelectEntity = useCallback((entityInstance?: Record<string, unknown>) => {
      if (onChange != null) {
        onChange(entityInstance);
      }
    }, [onChange]);

  const handleClick = useCallback(() => {
    try{
      openCrudScreen({
        entityName,
        crudScreenType: "entityList",
        screens,
        props: {
          onSelectEntity
        }
      })
    } catch(_e) {
      notifications.show({
        type: NotificationType.ERROR,
        description: intl.formatMessage({ id: "common.openScreenError" }, {entityName})
      });
    }
  }, [entityName, screens, onSelectEntity]);

  return (
    <Input 
      prefix={<LinkOutlined />}
      onClick={handleClick}
      value={inputValue}
      disabled={disabled}
      id={propertyName}
    />
  );
}

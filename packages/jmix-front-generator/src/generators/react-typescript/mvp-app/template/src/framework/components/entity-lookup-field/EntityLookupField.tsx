import {Input, notification} from "antd";
import {LinkOutlined} from "@ant-design/icons";
import {useCallback} from "react";
import {useScreens} from "@haulmont/jmix-react-core";
import {useIntl} from "react-intl";
import {ReactComponent} from "../../screen-api/ReactComponent";
import {openBreadcrumb} from "../../screen-api/openBreadcrumb";

export interface EntityLookupFieldProps {
  value?: Record<string, unknown>;
  onChange?: (value: this['value']) => void;
  listComponent?: ReactComponent;
  listComponentProps?: Record<string, unknown>;
  getDisplayName: (value: Record<string, unknown>) => string;
  label: string;
}

export function EntityLookupField(props: EntityLookupFieldProps) {
  const {value, onChange, listComponent, listComponentProps, getDisplayName, label} = props;

  const screens = useScreens();
  const intl = useIntl();

  const handleClick = useCallback(() => {
    const enableSelectModeProps = {
      onSelect: (entityInstance: Record<string, unknown>) => {
        if (onChange != null) {
          onChange(entityInstance);
        }
      }
    };

    if (listComponent == null) {
      notification.warn({message: `Please define lookup screen for reference field "${label}"`});
      return;
    }

    openBreadcrumb({
      component: listComponent,
      props: {
        ...enableSelectModeProps,
        ...listComponentProps
      },
      title: intl.formatMessage({id: 'EntityLookupField.selectEntityInstance'}),
      screens
    });
  }, [onChange, listComponent]);

  return (
    <Input prefix={<LinkOutlined />}
           onClick={handleClick}
           value={value ? getDisplayName(value) : ''}
    />
  );
}
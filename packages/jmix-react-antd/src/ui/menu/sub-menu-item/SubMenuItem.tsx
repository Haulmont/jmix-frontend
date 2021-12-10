import React, {useMemo} from "react";
import {useIntl} from "react-intl"
import { Menu, SubMenuProps } from "antd";
import {MenuPermissionContainer} from "@haulmont/jmix-react-web";

export interface Props extends SubMenuProps {
  caption: string;
  eventKey?: string;
}

export const SubMenuItem: React.FC<Props> = ({caption, ...subMenuItemProps}: Props) => {
  const {formatMessage, locale} = useIntl();
  const formattedCaption = useMemo(() => {
    return formatMessage({id: caption, defaultMessage: caption})
  }, [caption, locale]);

  return (
    <MenuPermissionContainer accessKey={subMenuItemProps.eventKey ?? ""}>
      <Menu.SubMenu 
        {...subMenuItemProps}
        title={formattedCaption}
      />
    </MenuPermissionContainer>
  )
}

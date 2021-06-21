import React, {useMemo} from "react";
import {useIntl} from "react-intl"
import { Menu, SubMenuProps } from "antd";

interface Props extends SubMenuProps {
  caption: string
}

export const SubMenuItem: React.FC<Props> = ({caption, ...subMenuItemProps}: Props) => {
  const {formatMessage, locale} = useIntl();

  const formattedCaption = useMemo(() => {
    return formatMessage({id: caption, defaultMessage: caption})
  }, [caption, locale]);

  return (
    <Menu.SubMenu 
      {...subMenuItemProps}
      title={formattedCaption}
    />
  )
}

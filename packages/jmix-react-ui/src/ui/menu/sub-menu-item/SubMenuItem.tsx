import React, {useMemo} from "react";
import {useIntl} from "react-intl"
import { Menu, SubMenuProps } from "antd";

interface Props extends SubMenuProps {
  caption: string
}

export const SubMenuItem: React.FC<Props> = ({caption, ...subMenuItemProps}: Props) => {
  const {formatMessage} = useIntl();

  const formattedCaption = useMemo(() => {
    return formatMessage({id: caption, defaultMessage: caption})
  }, [caption])

  return (
    <Menu.SubMenu 
      {...subMenuItemProps}
      title={formattedCaption}
    />
  )
}

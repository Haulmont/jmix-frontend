import { Select } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";
import { EntityNamesInfo } from "../EntityInspector.types"
import styles from "./EntitySelect.less";

interface Props {
  onSelectChange: (value: string) => void,
  entities: EntityNamesInfo[]
}
export const EntitySelect: React.FC<Props> = ({ entities, onSelectChange }: Props) => {
  return (
    <div className={styles['select-container']}>
      <div className={styles['select-title']}> 
        <FormattedMessage id={"addons.DataTools.selectEntity"}/>
      </div>
      <Select
        className={styles['select']}
        onChange={onSelectChange}
      >
        {entities.map(({entityName, className}: EntityNamesInfo) => {
          return (
            <Select.Option
              value={entityName}
              key={entityName}
            >
              {getEntityOptionCaption({entityName, className})}
            </Select.Option>
          )
        })}
      </Select>
    </div>
  )
}

function getEntityOptionCaption({entityName, className}: EntityNamesInfo): string {
  return `${className} (${entityName})`;
}

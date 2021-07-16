import { Select } from "antd";
import React from "react";
import { EntityNamesInfo } from "@haulmont/jmix-react-core"
import "./EntitySelect.css";

interface Props {
  onSelectChange: (value: string) => void,
  entities: EntityNamesInfo[]
}
export const EntitySelect: React.FC<Props> = ({ entities, onSelectChange }: Props) => {
  return (
    <div className={"entity-select-container"}>
      <div className={"entity-select-title"}> Choose entity</div>
      <Select
        onChange={onSelectChange}
        style={{ width: 340 }}
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

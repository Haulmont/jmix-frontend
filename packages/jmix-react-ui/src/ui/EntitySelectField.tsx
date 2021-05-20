import {observer} from "mobx-react";
import {Select} from "antd";
import * as React from "react";
import { DataCollectionStore, HasId, MayHaveInstanceName, MayHaveId } from "@haulmont/jmix-react-core";
import {getStringId} from "@haulmont/jmix-rest";

export interface EntitySelectFieldProps {
  optionsContainer?: DataCollectionStore<MayHaveId>; // TODO remove once REST API support is dropped
  associationOptions?: Array<HasId & MayHaveInstanceName>;
  allowClear?: boolean;
}

export const EntitySelectField = observer((props: EntitySelectFieldProps) => {
  const {optionsContainer, associationOptions, ...rest} = props;

  let options: Array<HasId & MayHaveInstanceName> | undefined;

  if (associationOptions != null) 
    options = associationOptions;
  else if (optionsContainer != null) 
    options = optionsContainer
      .items
      .filter((e: MayHaveId & MayHaveInstanceName) => e.id != null)
      .map((e: MayHaveId & MayHaveInstanceName) => ({id: e.id!, instanceName: e._instanceName}));
  

  return (
    <Select {...rest} loading={optionsContainer && optionsContainer.status === "LOADING"}>
      {options && options.map(option =>
        <Select.Option value={getStringId(option.id)} key={getStringId(option.id)}>
          {option._instanceName ?? option.id}
        </Select.Option>)
      }
    </Select>);
});

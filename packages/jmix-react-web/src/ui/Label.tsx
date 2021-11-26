import React from "react";
import {Msg} from "./Msg";

export interface LabelProps extends React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  entityName: string;
  propertyName: string;
}

export const Label = ({entityName, propertyName, ...rest}: LabelProps) => {
  return (
    <label {...rest}>
      <Msg entityName={entityName} propertyName={propertyName}/>
    </label>
  )
}
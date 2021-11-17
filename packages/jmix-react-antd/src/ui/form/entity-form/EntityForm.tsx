import {Form, FormProps} from "antd";
import React from "react";

export const EntityNameContext = React.createContext<string>('');

export type EntityFormProps = FormProps & {entityName: string};

/**
 * A simple wrapper around Ant Design Form that provides context containing entity name.
 *
 * @param children
 * @param entityName
 * @param rest
 * @constructor
 */
export const EntityForm = ({children, entityName, ...rest}: EntityFormProps) => {
  return (
    <EntityNameContext.Provider value={entityName}>
      <Form
        {...rest}
      >
        {children}
      </Form>
    </EntityNameContext.Provider>
  );
};

import React, { PropsWithoutRef, RefAttributes } from "react";
import {Form, Input as AntdInput} from "antd";
import {InputProps as AntdInputProps} from "antd";
import { FieldProps, getDefaultFormItemProps } from "../form/Form";
import { observer } from "mobx-react";
import { useMetadata } from "@haulmont/jmix-react-core";
import { FieldPermissionContainer } from "../form/FieldPermssionContainer";
import { passthroughRule } from "../form/validation/passthroughRule";


type TextFieldProps<ExtTextFieldComponentProps> = FieldProps<ExtTextFieldComponentProps> & {
  textFieldComponent?: (props: TextFieldComponentProps<ExtTextFieldComponentProps>) => JSX.Element
}

type TextFieldComponentProps<ExtTextFieldComponentProps> = ExtTextFieldComponentProps & {
  disabled?: boolean
}

export const TextField = function <ExtTextFieldComponentProps = AntdInputProps>({
  textFieldComponent = (props: TextFieldComponentProps<ExtTextFieldComponentProps>) => {
    return (
      <AntdInput 
        {...props as AntdInputProps}
      />
    );
  },
  ...textFieldProps
}: TextFieldProps<ExtTextFieldComponentProps>) {
  const TextFieldComponent = observer(React.forwardRef((props: TextFieldComponentProps<ExtTextFieldComponentProps>, ref: any) => {
    return textFieldComponent({...props, ref});
  }));
  const FormTextField = observer((props: FieldProps<ExtTextFieldComponentProps>) => {

    const {
      entityName, propertyName, componentProps,
      disabled, formItemProps
    } = props;
  
    const metadata = useMetadata();
  
    const combinedFormItemProps = {...getDefaultFormItemProps(metadata.entities, entityName, propertyName), ...formItemProps};
    if (combinedFormItemProps.rules == null) {
      combinedFormItemProps.rules = [];
    }
    // Add a passthrough rule. This will clear server-side errors on `validateTrigger` without having to manually set errors on fields.
    combinedFormItemProps.rules.push(passthroughRule);

  
    return (
      <FieldPermissionContainer entityName={entityName} propertyName={propertyName} renderField={(isReadOnly: boolean) => {
        const textFieldComponentProps = {...componentProps, disabled: disabled || isReadOnly} as TextFieldComponentProps<ExtTextFieldComponentProps>
        return (
          <Form.Item 
            {...combinedFormItemProps}
          >
            <TextFieldComponent
              {...textFieldComponentProps as PropsWithoutRef<TextFieldComponentProps<ExtTextFieldComponentProps>> & RefAttributes<unknown>}
            />
          </Form.Item>
        )
  
      }}/>);
  
  });

  return (
    <FormTextField
      {...textFieldProps}
    />
  )
}

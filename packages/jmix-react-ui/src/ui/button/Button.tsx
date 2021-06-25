import React, {forwardRef, Ref, PropsWithoutRef, RefAttributes } from "react";
import {Button as AntdButton, ButtonProps as AntdButtonProps} from "antd";

type ButtonPropsWithRef<ExtButtonProps, ExtButtonRefType> = ExtButtonProps & {
  ref?: Ref<ExtButtonRefType>
}

type ButtonProps<ExtButtonProps, ExtButtonRefType> = ButtonPropsWithRef<ExtButtonProps, ExtButtonRefType> & {
  buttonComponent?: (props: ButtonPropsWithRef<ExtButtonProps, ExtButtonRefType>) => JSX.Element,
}
export const Button = function <ExtButtonProps = AntdButtonProps, ExtButtonRef = any>({
  buttonComponent = (props: ButtonPropsWithRef<ExtButtonProps, ExtButtonRef> ) => {
    return (
      <AntdButton 
        {...props as ButtonPropsWithRef<AntdButtonProps, HTMLElement>}
      />
    );
  },
  ...buttonProps
}: ButtonProps<ExtButtonProps, ExtButtonRef>) {
  const ButtonComponentWithRef = forwardRef((props: ExtButtonProps, ref: Ref<ExtButtonRef>) => {
    return buttonComponent({...props, ref});
  })
  return <ButtonComponentWithRef {...buttonProps as PropsWithoutRef<ExtButtonProps> & RefAttributes<ExtButtonRef>}/>
}

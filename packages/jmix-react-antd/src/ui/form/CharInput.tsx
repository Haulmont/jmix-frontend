import {Input} from "antd";
import {InputProps} from "antd/lib/input";
import React, {forwardRef, Ref} from "react";
import styles from "./CharInput.module.less";
import classNames from "classnames";

export const CharInput = forwardRef((props: InputProps, ref: Ref<Input>) => {
  const {className = '', ...rest} = props;
  return (
    <Input 
      {...rest}
      ref={ref}
      maxLength={1}
      className={classNames(
        className,
        styles.charInputField
      )} 
    />
  );
});

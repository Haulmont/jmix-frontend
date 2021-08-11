import {InputNumber} from "antd";
import * as React from "react";
import styles from './InputNumber.module.less';
import {forwardRef, Ref} from 'react';
import {InputNumberProps} from 'antd/es/input-number';

export const IntegerInput = forwardRef((props: InputNumberProps, ref: Ref<typeof InputNumber>) => {
  return (
    <InputNumber min={JAVA_INTEGER_MIN_VALUE}
                 max={JAVA_INTEGER_MAX_VALUE}
                 precision={0}
                 className={styles.inputNumberField}
                 // @ts-ignore ref is missing in typings, but it does actually work
                 ref={ref}
                 {...props}
    />
  );
});

const JAVA_INTEGER_MIN_VALUE = -2_147_483_648;
const JAVA_INTEGER_MAX_VALUE = 2_147_483_647;

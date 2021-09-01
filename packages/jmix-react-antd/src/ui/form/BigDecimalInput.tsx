import {InputNumber} from 'antd';
import * as React from 'react';
import styles from './InputNumber.module.less';
import {forwardRef, Ref} from 'react';
import {InputNumberProps} from 'antd/es/input-number';

// TODO Add validation of precision/scale https://github.com/cuba-platform/frontend/issues/100
export const BigDecimalInput = forwardRef((props: InputNumberProps, ref: Ref<typeof InputNumber>) => {
  return (
    <InputNumber className={styles.inputNumberField}
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                 // @ts-ignore ref is missing in typings, but it does actually work
                 ref={ref}
                 stringMode={true}
                 {...props}
    />
  );
});

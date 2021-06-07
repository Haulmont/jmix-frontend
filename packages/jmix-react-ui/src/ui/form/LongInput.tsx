import {InputNumber} from "antd";
import * as React from "react";
import './InputNumber.less';
import {forwardRef, Ref} from 'react';
import {InputNumberProps} from 'antd/es/input-number';

export const LongInput = forwardRef((props: InputNumberProps, ref: Ref<typeof InputNumber>) => {
  return (
    <InputNumber className='inputnumber-field'
                 precision={0}
                 // @ts-ignore ref is missing in typings, but it does actually work
                 ref={ref}
                 stringMode={true}
                 {...props}
    />
  );
});

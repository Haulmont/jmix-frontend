import {InputNumber} from 'antd';
import * as React from 'react';
import './InputNumber.less';
import {forwardRef, Ref} from 'react';
import {InputNumberProps} from 'antd/es/input-number';

// TODO Add validation of precision/scale https://github.com/cuba-platform/frontend/issues/100
export const BigDecimalInput = forwardRef((props: InputNumberProps, ref: Ref<typeof InputNumber>) => {
  return (
    <InputNumber className='inputnumber-field'
                 // @ts-ignore ref is missing in typings, but it does actually work
                 ref={ref}
                 stringMode={true}
                 {...props}
    />
  );
});

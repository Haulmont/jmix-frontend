import React from 'react';
import { InputNumber, InputNumberProps } from 'antd';
import { JmixFormFieldWrapper } from './base/JmixFormFieldWrapper';
import { JmixFormFieldProps } from './base/JmixFormFieldProps';

type NumberFieldProps = JmixFormFieldProps & InputNumberProps;

function NumberField(props: NumberFieldProps) {
  const { entityName, propertyName, formItemProps, ...rest } = props;

  return (
    <JmixFormFieldWrapper entityName={entityName}
                          propertyName={propertyName}
                          formItemProps={formItemProps}
                          renderField={(isReadOnly) => (
                            <InputNumber disabled={isReadOnly}
                                         {...rest}
                            />
                          )}
    />
  );
}

export { NumberField, NumberFieldProps };
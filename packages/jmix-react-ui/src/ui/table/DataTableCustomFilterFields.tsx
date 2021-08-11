import {IntlShape} from 'react-intl';
import React, {ReactNode} from 'react';
import { Form } from 'antd';
import { FormItemProps } from 'antd/es/form';
import styles from './DataTableFilter.module.less';
import classNames from 'classnames';

export function getDefaultFilterFormItemProps(intl: IntlShape, name: string): FormItemProps {
  return {
    name,
    initialValue: null,
    rules: [
      {
        required: true,
        message: intl.formatMessage({id: 'jmix.dataTable.validation.requiredField'})
      }
    ]
  };
}

export function wrapInFormItem(
  children: ReactNode,
  hasFeedback: boolean = false,
  formItemProps: FormItemProps,
  additionalClassName?: string,
): ReactNode {
  return (
    <Form.Item 
      hasFeedback={hasFeedback} 
      className={classNames(
        styles.filterControl,
        additionalClassName
      )} 
      {...formItemProps}>
      {children}
    </Form.Item>
  );
}
import React from 'react';
import {Spin} from "antd";
import styles from './Spinner.module.less';

export function Spinner() {

  return (
    <div className={styles.spinner}>
      <Spin size="large"/>
    </div>
  );

}
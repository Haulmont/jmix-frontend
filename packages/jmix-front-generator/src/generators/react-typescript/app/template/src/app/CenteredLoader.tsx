import { LoadingOutlined } from '@ant-design/icons';
import Centered from './common/Centered';
import React from 'react';
import styles from './CenteredLoader.module.css';

const CenteredLoader = () => (
  <Centered>
    <LoadingOutlined className={styles.icon} spin={true} />
  </Centered>
);

export default CenteredLoader;

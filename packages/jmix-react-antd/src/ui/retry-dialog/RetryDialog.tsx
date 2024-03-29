import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Button} from "antd";
import styles from './RetryDialog.module.less';
import {RedoOutlined} from "@ant-design/icons";

export interface RetryDialogProps {
  onRetry: () => void;
  messageId?: string;
}

export const RetryDialog = (props: RetryDialogProps) => {
  const {
    onRetry,
    messageId = 'common.requestFailed'
  } = props;

  return (
    <>
      <FormattedMessage id={messageId} />.
      <Button htmlType="button"
              className={styles.retryBtn}
              icon={ <RedoOutlined/> }
              onClick={onRetry}>
        <span>
          <FormattedMessage id="common.retry" />
        </span>
      </Button>
    </>
  );
};
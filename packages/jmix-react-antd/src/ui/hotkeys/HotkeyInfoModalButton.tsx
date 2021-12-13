import { MacCommandOutlined } from '@ant-design/icons';
import { useHotkeyStore } from '@haulmont/jmix-react-web';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { HotkeyInfo } from './HotkeyInfo';
import styles from "./HotkeyInfoModalButton.module.less";
import classNames from "classnames";

interface HotkeyInfoModalButtonProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  className?: string;
}
export const HotkeyInfoModalButton = observer(({
  visible,
  setVisible,
  className,
}: HotkeyInfoModalButtonProps) => {
  const intl = useIntl();
  const { hotkeyConfigs } = useHotkeyStore();

  return (
    <>
      <Button
        type="text"
        className={classNames(styles.hotkeyInfoButton, className)}
        icon={<MacCommandOutlined role={""}/>}
        onClick={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        title={intl.formatMessage({ id: "hotkeys.hotkeyInfo.title" })}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <div className={styles.scrollContainerStyle}>
          <HotkeyInfo hotkeyConfigs={hotkeyConfigs} />
        </div>
      </Modal>
    </>
  );
});

import { MacCommandOutlined } from '@ant-design/icons';
import { useHotkeyStore } from '@haulmont/jmix-react-web';
import { Button, Modal } from 'antd';
import { observer } from 'mobx-react';
import React from 'react';
import { useIntl } from 'react-intl';
import { HotkeyInfo } from './HotkeyInfo';
import styles from "./HotkeyInfoModalButton.module.less";

interface HotkeyInfoModalButtonProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
export const HotkeyInfoModalButton = observer(({
  visible,
  setVisible,
}: HotkeyInfoModalButtonProps) => {
  const intl = useIntl();
  const { hotkeyConfigs } = useHotkeyStore();

  return (
    <>
      <Button
        type="text"
        className={styles.hotkeyInfoButton}
        icon={<MacCommandOutlined />}
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

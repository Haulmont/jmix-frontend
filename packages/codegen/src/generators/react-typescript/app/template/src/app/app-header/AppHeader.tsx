import { Button, Modal, notification, Space } from "antd";
import { LogoutOutlined, MacCommandOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import "./AppHeader.css";
import { useHotkeyStore } from "@amplicode/react-core";
import { HotkeyInfo } from "@amplicode/react-antd";
import { observer } from "mobx-react";
import { securityStore } from "../../security-store";

const HotkeyInfoButton = observer(() => {
  const [visible, setVisible] = useState(false);
  const intl = useIntl();
  const {hotkeyConfigs} = useHotkeyStore();

  return (
    <>
      <Button
        type="text"
        className="app-header__icon-btn"
        icon={<MacCommandOutlined />}
        onClick={() => setVisible(true)}
      />
      <Modal
        visible={visible}
        title={intl.formatMessage({ id: "hotkeys.hotkeyInfo.title" })}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <HotkeyInfo hotkeyConfigs={hotkeyConfigs} />
      </Modal>
    </>
  );
});

export const AppHeader = observer(() => {
  const intl = useIntl();

  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: intl.formatMessage({id: 'auth.logout.confirm'}),
      okText: intl.formatMessage({id: 'common.ok'}),
      cancelText: intl.formatMessage({id: 'common.cancel'}),
      onOk: () => {
        securityStore.logout((status) => {
          if (status !== 200) {
            notification.error({
              message: intl.formatMessage({id: "auth.logout.unknownError"})
            });
          }
        });
      }
    });
  }, [intl]);

  return (
    <div className="app-header">
      <Space className="app-header__user-panel">
        <HotkeyInfoButton />
        <Button
          id="button_logout"
          className="app-header__icon-btn"
          type="text"
          icon={<LogoutOutlined />}
          onClick={showLogoutConfirm}
        />
      </Space>
    </div>
  );
});

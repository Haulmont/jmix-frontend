import {Button, Modal, Space} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useCallback} from "react";
import {securityStore} from "../../index";
import './AppHeader.css';

export const AppHeader = () => {
  const showLogoutConfirm = useCallback(() => {
    Modal.confirm({
      content: 'Are you sure you want to logout?',
      okText: 'OK',
      cancelText: 'Cancel',
      onOk: () => securityStore.logout()
    });
  }, [securityStore]);

  return (
    <>
      <div className="app-header">
        <Space className="app-header__user-panel">
          <Button
            id="button_logout"
            className="app-header__user-panel__logout-btn"
            type="text"
            icon={<LogoutOutlined />}
            onClick={showLogoutConfirm}
          />
        </Space>
      </div>
    </>
  );
};
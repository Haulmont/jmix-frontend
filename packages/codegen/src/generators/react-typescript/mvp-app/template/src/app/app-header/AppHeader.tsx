import {Button, Modal, notification, Space} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useCallback} from "react";
import {securityStore} from "../../index";
import {useIntl} from "react-intl";
import './AppHeader.css';

export const AppHeader = () => {
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
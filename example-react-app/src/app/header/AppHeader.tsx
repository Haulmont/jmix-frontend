import { LogoutOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useCallback } from "react";
import { observer } from "mobx-react";
import styles from "./AppHeader.module.css";
import { useMainStore } from "@haulmont/jmix-react-core";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { useIntl } from "react-intl";
import JmixLightIcon from "../icons/JmixLightIcon";
import { modals } from "@haulmont/jmix-react-antd";

const AppHeader = observer(({ children }: { children?: React.ReactNode }) => {
  const intl = useIntl();
  const mainStore = useMainStore();

  const showLogoutConfirm = useCallback(() => {
    modals.open({
      content: intl.formatMessage({ id: "header.logout.areYouSure" }),
      okText: intl.formatMessage({ id: "header.logout.ok" }),
      cancelText: intl.formatMessage({ id: "header.logout.cancel" }),
      onOk: () => mainStore.logout()
    });
  }, [mainStore, intl]);

  return (
    <div className={styles.header}>
      <JmixLightIcon className={styles.icon} />

      <div className={styles.content}>{children}</div>

      <Space className={styles.userPanel}>
        <LanguageSwitcher className={styles.languageSwitcher} />
        <span>{mainStore.userName}</span>
        <Button
          id="button_logout"
          className={styles.logoutBtn}
          type="text"
          icon={<LogoutOutlined />}
          onClick={showLogoutConfirm}
        />
      </Space>
    </div>
  );
});

export default AppHeader;

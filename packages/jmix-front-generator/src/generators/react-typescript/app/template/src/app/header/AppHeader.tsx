import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useCallback, useState } from "react";
import { observer } from "mobx-react";
import styles from "./AppHeader.module.css";
import { useMainStore } from "@haulmont/jmix-react-core";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { ThemeSwitcher } from "../../themes/ThemeSwitcher";
import { useIntl } from "react-intl";
import JmixLightIcon from "../icons/JmixLightIcon";
import {modals} from "@haulmont/jmix-react-antd";

const AppHeader = observer(({children}: {children?: React.ReactNode}) => {
  const intl = useIntl();
  const mainStore = useMainStore();

  const [settingsEnabled, setSettingsEnabled] = useState<boolean>(false);

  const toggleSettings = useCallback(() => {
    setSettingsEnabled((isEnabled) => {
      return !isEnabled;
    })
  }, [])

  const showLogoutConfirm = useCallback(() => {
    modals.open({
      content: intl.formatMessage({id: 'header.logout.areYouSure'}),
      okText: intl.formatMessage({id: 'header.logout.ok'}),
      cancelText: intl.formatMessage({id: 'header.logout.cancel'}),
      onOk: () => mainStore.logout()
    });
  }, [mainStore, intl]);

  return (
    <div className={styles.header}>
      <JmixLightIcon className={styles.icon} />

      <div className={styles.content}>{children}</div>
      <>
      {settingsEnabled && (
          <>
            <ThemeSwitcher className={styles.themeSwitcher} />
            <LanguageSwitcher className={styles.languageSwitcher} />
          </>
        )}
      </>
      <Space className={styles.userPanel}>
        <span>{mainStore.userName}</span>
        <Button
          className={settingsEnabled ? styles.settingsBtnActive : styles.settingsBtn}
          type={"text"}
          icon={<SettingOutlined />}
          onClick={toggleSettings}
        />
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

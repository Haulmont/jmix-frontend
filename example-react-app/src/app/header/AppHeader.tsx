import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useCallback, useState } from "react";
import { observer } from "mobx-react";
import { HotkeyConfig, useHotkey } from "@haulmont/jmix-react-web";
import { useMainStore } from "@haulmont/jmix-react-core";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { ThemeSwitcher } from "../../themes/ThemeSwitcher";
import { useIntl } from "react-intl";
import JmixLightIcon from "../icons/JmixLightIcon";
import styles from "./AppHeader.module.css";
import { modals, HotkeyInfoModalButton } from "@haulmont/jmix-react-antd";
import { KeyHandler } from "hotkeys-js";

const toggleHotkeyInfoHotkeyConfig: HotkeyConfig = {
  description: "hotkeys.hotkeyInfo.toggleHotkeyInfo",
  categoryName: "hotkeys.hotkeyInfo.categoryName",
  hotkey: "/"
};

export const hotkeyInfoHotkeyConfigs: HotkeyConfig[] = [
  toggleHotkeyInfoHotkeyConfig
];

const AppHeader = observer(({ children }: { children?: React.ReactNode }) => {
  const intl = useIntl();
  const mainStore = useMainStore();

  const [settingsEnabled, setSettingsEnabled] = useState(false);

  const [visibleHotkeyInfo, setVisibleHotkeyInfo] = useState(false);

  const toggleHotkeyInfo = useCallback<KeyHandler>(
    () => setVisibleHotkeyInfo(!visibleHotkeyInfo),
    [visibleHotkeyInfo]
  );
  useHotkey(toggleHotkeyInfoHotkeyConfig, toggleHotkeyInfo);

  const toggleSettings = useCallback(() => {
    setSettingsEnabled(isEnabled => {
      return !isEnabled;
    });
  }, []);

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
          className={
            settingsEnabled ? styles.settingsBtnActive : styles.settingsBtn
          }
          type={"text"}
          icon={<SettingOutlined role={""} />}
          onClick={toggleSettings}
          role={"switch"}
          aria-checked={settingsEnabled}
        />
        <HotkeyInfoModalButton
          visible={visibleHotkeyInfo}
          setVisible={setVisibleHotkeyInfo}
        />
        <Button
          id="button_logout"
          className={styles.logoutBtn}
          type="text"
          icon={<LogoutOutlined role={""} />}
          onClick={showLogoutConfirm}
        />
      </Space>
    </div>
  );
});

export default AppHeader;

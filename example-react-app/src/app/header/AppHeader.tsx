import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback } from "react";
import { observer } from "mobx-react";
import "./AppHeader.css";
import { useMainStore } from "@haulmont/jmix-react-core";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { useIntl } from "react-intl";
import JmixLightIcon from "../icons/JmixLightIcon";
import { modals } from "@haulmont/jmix-react-ui";

const AppHeader = observer(() => {
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
    <div className="app-header">
      <JmixLightIcon className="app-header__icon" />

      <div className="user-panel">
        <LanguageSwitcher className="panelelement language-switcher -header" />
        <span className="panelelement">{mainStore.userName}</span>
        <Button
          className="panelelement"
          id="button_logout"
          ghost={true}
          icon={<LogoutOutlined />}
          onClick={showLogoutConfirm}
        />
      </div>
    </div>
  );
});

export default AppHeader;

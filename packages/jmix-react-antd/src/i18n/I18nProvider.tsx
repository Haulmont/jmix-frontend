import React, {useCallback} from 'react';
import {observer} from 'mobx-react';
import {ConfigProvider} from 'antd';
import {RawIntlProvider} from 'react-intl';
import {getMainStore} from '@haulmont/jmix-react-core';
import {antdLocalesStore} from "./AntdLocalesStore";
import {localesStore} from "@haulmont/jmix-react-web";
import {getIntl} from "./intl";

type I18nProviderProps = {
  children: React.ReactNode | React.ReactNode[] | null,
  rtlLayout?: boolean
}

export const I18nProvider = observer(({children, rtlLayout}: I18nProviderProps) => {
  const mainStore = getMainStore()

  const getDirection = useCallback(() => {
    const rtlCondition = rtlLayout
      || localesStore.isRtlLayout(mainStore.locale);

    return rtlCondition ? 'rtl' : 'ltr';
  }, [rtlLayout, mainStore?.locale])

  const intl = getIntl();

  if (!mainStore || !mainStore.locale || !intl) {
    return null;
  }

  return (
    <RawIntlProvider value={intl}>
      <ConfigProvider
        locale={antdLocalesStore.antdLocaleMapping[mainStore.locale]}
        direction={getDirection()}
      >
        {children}
      </ConfigProvider>
    </RawIntlProvider>
  );
});
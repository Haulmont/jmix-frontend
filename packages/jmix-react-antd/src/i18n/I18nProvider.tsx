import * as React from 'react';
import {observer} from 'mobx-react';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import {getMainStore} from '@haulmont/jmix-react-core';
import {antdLocalesStore} from "./AntdLocalesStore";
import {localesStore} from "@haulmont/jmix-react-web";

type I18nProviderProps = {
  children: React.ReactNode | React.ReactNode[] | null,
}

export const I18nProvider = observer(({children}: I18nProviderProps) => {
  const mainStore = getMainStore()

  if (!mainStore || !mainStore.locale) {
    return null;
  }

  return (
    <IntlProvider locale={mainStore.locale} messages={localesStore.messagesMapping[mainStore.locale]}>
      <ConfigProvider locale={antdLocalesStore.antdLocaleMapping[mainStore.locale]}>
        {children}
      </ConfigProvider>
    </IntlProvider>
  );
});

import React, { CSSProperties, useCallback } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Select } from "antd";
import { useMainStore } from "@haulmont/jmix-react-core";
import { localesStore } from "@haulmont/jmix-react-web";

export interface LanguageSwitcherProps {
  className?: string;
  style?: CSSProperties;
}

export const LanguageSwitcher = observer((props: LanguageSwitcherProps) => {
  const mainStore = useMainStore();

  const handleChange = useCallback(
    action((locale: string) => {
      mainStore.locale = locale;
    }),
    [mainStore]
  );

  if (localesStore.localesInfo.length === 1) {
    return null; // Do not show LanguageSwitcher if there is only a single locale option
  }

  return (
    <Select
      defaultValue={mainStore.locale ?? undefined}
      onChange={handleChange}
      size="small"
      style={props.style}
      bordered={false}
      className={props.className}
      dropdownMatchSelectWidth={false}
    >
      {localesStore.localesInfo.map(({ locale, caption }) => (
        <Select.Option key={locale} value={locale}>
          {caption}
        </Select.Option>
      ))}
    </Select>
  );
});

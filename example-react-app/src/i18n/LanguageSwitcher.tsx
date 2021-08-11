import React, { CSSProperties, useCallback } from "react";
import { observer } from "mobx-react";
import { action } from "mobx";
import { Select } from "antd";
import { useMainStore } from "@haulmont/jmix-react-core";
import localeCaptions from "./localeCaptions";

export interface LanguageSwitcherProps {
  className?: string;
  style?: CSSProperties;
}

const localeOptions: string[] = ["en", "ru"];

export const LanguageSwitcher = observer((props: LanguageSwitcherProps) => {
  const mainStore = useMainStore();

  const handleChange = useCallback(
    action((locale: string) => {
      mainStore.locale = locale;
    }),
    [mainStore]
  );

  if (localeOptions.length === 1) {
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
      {localeOptions.map(locale => (
        <Select.Option key={locale} value={locale}>
          {localeCaptions[locale]}
        </Select.Option>
      ))}
    </Select>
  );
});

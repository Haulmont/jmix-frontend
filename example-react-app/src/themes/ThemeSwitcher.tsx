import React, {
  CSSProperties,
  useCallback,
  useMemo,
  useState,
  useEffect
} from "react";
import { useIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import { Select } from "antd";
import {
  setTheme,
  THEMES_CONFIG,
  ThemeInfo,
  getInitThemePreset,
  ThemePreset,
  SizeInfo
} from "./themes.core";

export interface Props {
  className?: string;
  style?: CSSProperties;
}

export const ThemeSwitcher: React.FC<Props> = props => {
  const intl = useIntl();

  const initThemePreset: ThemePreset = useMemo(() => {
    return getInitThemePreset();
  }, []);

  const [themePreset, setThemePreset] = useState<ThemePreset>(initThemePreset);

  useEffect(() => {
    setTheme(themePreset);
  }, [themePreset]);

  const themes: ThemeInfo[] = useMemo(() => {
    return THEMES_CONFIG.themes;
  }, []);

  const sizes: SizeInfo[] = useMemo(() => {
    return THEMES_CONFIG.sizes;
  }, []);

  const defaultSize: SizeInfo = useMemo(() => {
    return {
      name: "default",
      caption: "themes.sizes.defaultSize"
    };
  }, []);

  const handleThemeNameChange = useCallback((themeName: string) => {
    setThemePreset(currentThemePreset => {
      return {
        ...currentThemePreset,
        themeName
      };
    });
  }, []);

  const handleSizeNameChange = useCallback(
    (sizeName: string) => {
      setThemePreset(currentThemePreset => {
        return {
          ...currentThemePreset,
          sizeName: sizeName === defaultSize.name ? null : sizeName
        };
      });
    },
    [defaultSize.name]
  );

  return (
    <>
      {sizes.length > 0 && (
        <Select
          defaultValue={initThemePreset.sizeName ?? defaultSize.name}
          onChange={handleSizeNameChange}
          size="small"
          style={props.style}
          bordered={false}
          className={props.className}
          dropdownMatchSelectWidth={false}
          aria-label={intl.formatMessage({ id: "a11y.select.SizeSwitcher" })}
        >
          <Select.Option key={defaultSize.name} value={defaultSize.name}>
            <FormattedMessage id={defaultSize.caption} />
          </Select.Option>
          {sizes.map(({ name, caption }: SizeInfo) => (
            <Select.Option key={name} value={name}>
              <FormattedMessage id={caption} />
            </Select.Option>
          ))}
        </Select>
      )}
      {themes.length > 0 && (
        <Select
          defaultValue={initThemePreset.themeName}
          onChange={handleThemeNameChange}
          size="small"
          style={props.style}
          bordered={false}
          className={props.className}
          dropdownMatchSelectWidth={false}
          aria-label={intl.formatMessage({ id: "a11y.select.ThemeSwitcher" })}
        >
          {themes.map(({ name, caption }: ThemeInfo) => (
            <Select.Option key={name} value={name}>
              <FormattedMessage id={caption} />
            </Select.Option>
          ))}
        </Select>
      )}
    </>
  );
};

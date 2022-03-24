import themesConfig from "./themes.config.json";

export type ThemeInfo = {
  name: string;
  caption: string;
};

export type SizeInfo = {
  name: string;
  caption: string;
};

export type ThemePreset = {
  themeName: string;
  sizeName: string | null;
};

export type ThemesConfig = {
  pathToThemesDir: string;
  idThemePresetLink: string;
  storageThemeAttr: string;
  defaultThemePreset: ThemePreset;
  themes: ThemeInfo[];
  sizes: SizeInfo[];
};

export const THEMES_CONFIG = themesConfig as ThemesConfig;
const publicUrl = process.env.PUBLIC_URL ?? "";

export function initializeTheme() {
  setTheme(getInitThemePreset());
}

export function getLinkHref(themePreset: ThemePreset): string {
  const { pathToThemesDir } = THEMES_CONFIG;
  const { themeName, sizeName } = themePreset;
  const presetSizePostfix = sizeName ? `-${sizeName}` : "";
  const presetName = `${themeName}${presetSizePostfix}`;
  return `${publicUrl}${pathToThemesDir}/${presetName}.css`;
}

export function setTheme(themePreset: ThemePreset) {
  const { idThemePresetLink, storageThemeAttr } = THEMES_CONFIG;
  (document.getElementById(
    idThemePresetLink
  ) as HTMLLinkElement).href = getLinkHref(themePreset);
  localStorage.setItem(storageThemeAttr, JSON.stringify(themePreset));
}

export function getInitThemePreset(): ThemePreset {
  const { defaultThemePreset, storageThemeAttr, themes, sizes } = THEMES_CONFIG;

  let initThemePreset = { ...defaultThemePreset };
  const themePresetFromStorage = localStorage.getItem(storageThemeAttr);

  if (themePresetFromStorage != null) {
    const {
      themeName: themeNameFromStorage,
      sizeName: sizeNameFromStorage
    } = JSON.parse(themePresetFromStorage) as ThemePreset;

    const {
      themeName: defaultThemeName,
      sizeName: defaultSizeName
    } = defaultThemePreset;

    initThemePreset.themeName = themes.find(({ name }: ThemeInfo) => {
      return name === themeNameFromStorage;
    })
      ? themeNameFromStorage
      : defaultThemeName;

    initThemePreset.sizeName = sizes.find(({ name }: SizeInfo) => {
      return name === sizeNameFromStorage;
    })
      ? sizeNameFromStorage
      : defaultSizeName;
  }
  return initThemePreset;
}

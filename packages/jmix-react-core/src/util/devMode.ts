// It's more correct to retrieve dev mode status from @haulmont/react-ide-devtools
// but this will be unnecessary once https://github.com/Haulmont/jmix-frontend/issues/385 is resolved.
const DEV_MODE = process.env.REACT_APP_IDE_DEVMODE === "true";

export const isDevModeEnabled = () => {
  return DEV_MODE;
}
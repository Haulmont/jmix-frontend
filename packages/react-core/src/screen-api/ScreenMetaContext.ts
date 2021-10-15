import React, {useContext} from "react";

interface ScreenMeta {
  tabKey: string;
  breadcrumbKey: string;
}

export const ScreenMetaContext = React.createContext<ScreenMeta | undefined>(undefined);

export function useScreenMeta(): ScreenMeta {
  const screenMeta = useContext(ScreenMetaContext);

  if (screenMeta == null) {
    throw new Error('ScreenMetaContext is undefined');
  }

  return screenMeta;
}
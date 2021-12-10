import React from "react";
import {useMainStore} from '../app/MainStore';
import {observer} from "mobx-react";
import { useMemo } from 'react';

type Props = {
  screenId: string;
  screenContent: JSX.Element;
  accessLimitedMessage?: string;
}

export const ScreenAccessControl = observer((props: Props) => {
  const {screenId, screenContent, accessLimitedMessage} = props;

  const mainStore = useMainStore();

  const hasPermissions = useMemo(() => {
    return mainStore.security.isDataLoaded 
      ?  mainStore.security.isScreenPermissionGranted(screenId)
      :  false
  }, [mainStore.security.isDataLoaded , screenId]);

  if (!hasPermissions) {
    return (
      <span>{accessLimitedMessage}</span>
    )
  }

  return screenContent;
});

import {useMainStore} from '../app/MainStore';
import {observer} from "mobx-react";
import { useMemo } from 'react';

type Props = {
  accessKey: string;
  menuItem: JSX.Element;
}

export const MenuAccessControl = observer((props: Props) => {
  const {accessKey, menuItem} = props;

  const mainStore = useMainStore();

  const hasPermissions = useMemo(() => {
    return mainStore.security.isDataLoaded 
      ?  mainStore.security.isMenuPermissionGranted(accessKey)
      :  false
  }, [mainStore.security.isDataLoaded ,  accessKey]);

  if (!hasPermissions) {
    return null;
  }

  return menuItem;
});




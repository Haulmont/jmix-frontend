import React, {PropsWithChildren, useContext} from 'react';
import { observer } from "mobx-react";
import { ScreensContext, IMultiScreenItem, ErrorBoundary } from '@haulmont/jmix-react-core';
import { FormattedMessage, useIntl } from 'react-intl';
import styles from "./styles.module.less";


export const MultiScreenContext = React.createContext<IMultiScreenItem>(null!);

export interface IMultiScreenProps {
  children?: React.ReactNode;
}

export const MultiScreen = observer((props: IMultiScreenProps) => {
  const screens = useContext(ScreensContext);
  screens.props = props;

  let content = null;
  if (screens.screens.length) {
    content = screens.screens.map((item) => {
      return <MultiScreenItem item={item} key={item.key} />;
    });
  }

  return (
    <MultiScreenErrorBoundary>
      {content}
    </MultiScreenErrorBoundary>
  );
});

export const MultiScreenErrorBoundary = (props: PropsWithChildren<{}>) => {
  const intl = useIntl();

  return (
    <ErrorBoundary message={intl.formatMessage({id: 'common.unknownTabError'})}>
      <div>
        <Breadcrumbs/>
        <div>{props.children}</div>
      </div>
    </ErrorBoundary>
  );
};

interface IMultiScreenItemProps {
  item: IMultiScreenItem;
}

const MultiScreenItem = observer((props: IMultiScreenItemProps) => {
  const screens = useContext(ScreensContext);
  const { item } = props;

  const style: any = {};
  if (
    screens.currentScreen !== null &&
    screens.currentScreen !== item
  ) {
    style.display = "none";
  }

  return (
    <span style={style}>
      <MultiScreenContext.Provider value={item}>
        {item.content}
      </MultiScreenContext.Provider>
    </span>
  );
});

const Breadcrumbs = observer(() => {
  const screens = useContext(ScreensContext);
  if (screens.screens.length <= 1) return null;

  return (
    <div className={styles.breadcrumbs}>
      {Array.from(screens.screens).map(screen => (
        <Breadcrumb screen={screen} key={screen.key} />
      ))}
    </div>
  );
});

interface IBreadcrumbProps {
  screen: IMultiScreenItem;
}

const Breadcrumb = observer((props: IBreadcrumbProps) => {
  const screens = useContext(ScreensContext);
  const { screen } = props;

  function handleClick() {
    screens.setActiveScreen(screen);
  }

  return (
    <span
      onClick={handleClick}
      className={styles.breadcrumb}
      data-active={screens.currentScreen === screen}
    >
      <span className={styles.caption}>
        <FormattedMessage id={screen.title} />
      </span>
      <span className={styles.separator}>{">"}</span>
    </span>
  );
});

export function useMultiScreen(): IMultiScreenItem {
  return useContext(MultiScreenContext);
}

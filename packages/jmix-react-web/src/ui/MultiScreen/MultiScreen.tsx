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
      <div>
        <Breadcrumbs/>
        <div>{content}</div>
      </div>
    </MultiScreenErrorBoundary>
  );
});

export const MultiScreenErrorBoundary = (props: PropsWithChildren<{}>) => {
  const intl = useIntl();

  return (
    <ErrorBoundary message={intl.formatMessage({id: 'common.unknownTabError'})}>
      {props.children}
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
    <div className={styles.breadcrumbs} role="tablist">
      {Array.from(screens.screens).map(screen => (
        <Breadcrumb screen={screen} key={screen.key}/>
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (["Enter", "Space"].includes(e.code)) {
      e.preventDefault();
      screens.setActiveScreen(screen);
    }
  }

  return (
    <span
      onClick={handleClick}
      className={styles.breadcrumb}
      data-active={screens.currentScreen === screen}
      role="tab"
      aria-selected={screens.currentScreen === screen}
      aria-controls={`${screen.key}-breadcrumb-${screen.key}`}
    >
      <span className={styles.caption} tabIndex={0} onKeyDown={handleKeyDown}>
        <FormattedMessage id={screen.title} />
      </span>
      <span className={styles.separator}>{">"}</span>
    </span>
  );
});

export function useMultiScreen(): IMultiScreenItem {
  return useContext(MultiScreenContext);
}

import React, { useContext } from 'react';
import { observer } from "mobx-react";
import { ScreensContext, IMultiScreenItem } from '@haulmont/jmix-react-core';
import "./styles.less";
import { FormattedMessage } from 'react-intl';


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
    <div>
      <Breadcrumbs />
      <div>{content}</div>
    </div>
  );
});

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
    <div className="jmix-multi-screen--breadcrumbs">
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
      className="jmix-multi-screen--breadcrumb"
      data-active={screens.currentScreen === screen}
    >
      <FormattedMessage id={screen.title} />
    </span>
  );
});

export function useMultiScreen(): IMultiScreenItem {
  return useContext(MultiScreenContext);
}

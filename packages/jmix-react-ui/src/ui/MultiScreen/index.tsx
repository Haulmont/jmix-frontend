import React from "react";
import { observer } from "mobx-react";
import { screens, IMultiScreenItem } from '@haulmont/jmix-react-core';

import "./styles.less";


export const MultiScreenContext = React.createContext<IMultiScreenItem>(null!);

export interface IMultiScreenProps {
  children?: React.ReactNode;
}

export const MultiScreen = observer((props: IMultiScreenProps) => {
  screens.props = props;

  let content = props.children;
  if (screens.screens.length) {
    content = screens.screens.map((item, index) => {
      const params = {} as { key?: string };
      // If we render last screen than force "create" it because {item} link can be same, but other params can be changes (example edit screen with another entityId param)
      if (index === screens.screens.length - 1) {
        params.key = Math.random() + "";
      }

      return <MultiScreenItem item={item} {...params} />;
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

export const MultiScreenItem = observer((props: IMultiScreenItemProps) => {
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
  if (screens.screens.length <= 1) return null;

  return (
    <div className="jmix-multi-screen--breadcrumbs">
      {Array.from(screens.screens).map(screen => (
        <Breadcrumb screen={screen} />
      ))}
    </div>
  );
});

interface IBreadcrumbProps {
  screen: IMultiScreenItem;
}

const Breadcrumb = observer((props: IBreadcrumbProps) => {
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
      <span>{screen.title}</span>
    </span>
  );
});

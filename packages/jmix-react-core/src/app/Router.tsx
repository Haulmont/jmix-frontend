import React, { useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { makeObservable, observable, reaction } from 'mobx';
import pathToRegexp from 'path-to-regexp';
import { EventEmitter } from './EventEmitter';

type anyObject = { [k: string]: any };

type RouterEvents = {
  navigate: () => any;
};
const eventEmitter = new EventEmitter<RouterEvents>();

function exec(re: RegExp, str: string, keys: pathToRegexp.Key[]) {
  const match = re.exec(str);

  if (match === null) return null;

  const paramsValues = match.slice(1);
  const result: { [key: string]: string } = {};
  for (let i = 0; i < paramsValues.length; i++) {
    const paramValue = paramsValues[i];
    const paramName = keys[i].name;

    result[paramName] = paramValue;
  }

  return result;
}

/**
 * Redirect. Example `redirect('/my_page', false, 'My page browser tab title');`
 * @param to - url to redirect
 * @param replace - use `history.replaceState(...)` instead of `history.pushState(...)`
 * @param title - browser tab title
 */
export function redirect(to: string, replace = false, title = '') {
  const currentFullPath = window.location.href.substr(window.location.origin.length);
  if (currentFullPath === to) return;

  if (currentRoute.hashMode) to = '#' + to;

  if (replace) {
    history.replaceState({}, title, to);
  } else {
    history.pushState({}, title, to);
  }

  currentRoute.setCurrentRoute();
}

export class CurrentRoute {
  @observable currentLocation = {
    path: '',
    fullPath: '',
    location: {
      hash: '',
      host: '',
      hostname: '',
      href: '',
      origin: '',
      pathname: '',
      port: '',
      protocol: '',
      search: '',
    },
  };
  @observable fullPath = window.location.pathname + window.location.search;
  /**
   * Object with route params
   */
  @observable routeParams: anyObject = {};
  @observable.ref currentRegExp: RegExp | null = null;
  /**
   * Object with window.location.search params
   */
  @observable searchParams: anyObject = {};
  @observable hashMode = false;

  constructor() {
    makeObservable(this);
    this.setCurrentRoute();

    window.addEventListener('popstate', this.setCurrentRoute);
    window.addEventListener('hashchange', this.setCurrentRoute);

    reaction(
      () => {
        return JSON.stringify(this.currentLocation);
      },
      () => {
        eventEmitter.emit('navigate');
      },
    );
  }

  /**
   * Parse current window.location and make routing navigation
   */
  setCurrentRoute = () => {
    const windowLocation = JSON.parse(JSON.stringify(window.location));

    let path = '';
    let fullPath = '';

    if (this.hashMode) {
      const hashPath = windowLocation.hash.substr(1);
      const parsedURL = new URL(hashPath, windowLocation.origin);
      path = parsedURL.pathname;
      fullPath = hashPath;
    } else {
      path = windowLocation.pathname;
      fullPath = path + windowLocation.search;

      const parsedURL = new URL(fullPath, windowLocation.origin);
      this.searchParams = Object.fromEntries(parsedURL.searchParams.entries());
    }

    this.currentLocation = {
      path,
      fullPath,
      location: windowLocation,
    };

    eventEmitter.emit('navigate');
  };
}

/**
 * See {@link CurrentRoute}
 */
export const currentRoute = new CurrentRoute();

let globalRoutersCount = 0;

export interface IRoutes {
  [k: string]: JSX.Element;
}

class RouterState {
  @observable.ref currentComponent: React.ReactNode | null = null;
  routes: IRoutes = {};
  disposer: (() => any) | null = null;

  constructor(routes: IRoutes) {
    makeObservable(this);
    this.routes = routes;

    this.disposer = eventEmitter.on('navigate', this.navigate);
    this.navigate();
  }

  onUnmount = () => {
    this.disposer!();
  };

  navigate = () => {
    const { routes } = this;
    let result = routes[''] || routes['*'] || null;

    let isRouteFound = false;

    const { path } = currentRoute.currentLocation;

    for (const route in routes) {
      if (!routes.hasOwnProperty(route)) continue;
      if (route === '' || route === '*') continue;
      const component = routes[route];

      let routePath = route;
      if (routePath.substr(-1) === '/') routePath = routePath.substr(0, routePath.length - 1);

      const keys: pathToRegexp.Key[] = [];
      const regexp = pathToRegexp(routePath, keys);
      const res = exec(regexp, path, keys);

      if (res) {
        isRouteFound = true;
        result = component;

        for (const key in res) {
          if (res[key] !== undefined) {
            res[key] = decodeURI(res[key]);
          }
        }

        // Set global route params only from global router, not from local
        if (global) {
          currentRoute.routeParams = res;
          currentRoute.currentRegExp = regexp;
        } else {
          currentRoute.routeParams = {};
        }

        break;
      }
    }

    if (!isRouteFound) {
      currentRoute.routeParams = {};
      currentRoute.currentRegExp = pathToRegexp(currentRoute.currentLocation.path, []);
    }

    this.currentComponent = result;
  };
}

export interface IRouterProps {
  /**
   * key-value object where key is route and value is what must to rendered. If key is "" or "*" that means Page not found
   * Example ['/my_page/:pageId?'] where `pageId` is optional param
   */
  routes: IRoutes;
  /**
   * mark router as global for populate currentRoute.routeParams and currentRoute.currentRegExp
   */
  global?: boolean;
  /**
   * hash router instead of regular url's
   */
  hashMode?: boolean;
}

/**
 * Example
 * ```
 * const myRoutes = {
 *   '/my_page/:pageId?': <MyPage />,
 *   '/my_page2': <MyPage2 />,
 * }
 * // ...
 * <Router routes={myRoutes} />
 * ```
 */
export const Router = observer((props: IRouterProps) => {
  const { routes, global = false, hashMode = false } = props;
  const [state] = useState(() => new RouterState(routes));

  useEffect(() => state.onUnmount, [state.onUnmount]);

  useEffect(() => {
    if (global) globalRoutersCount++;
    if (globalRoutersCount > 1) throw new Error(`Only 1 router exemplar can be global`);

    return () => {
      globalRoutersCount--;
    };
  }, [global]);

  useEffect(() => {
    currentRoute.hashMode = Boolean(hashMode);
    if (hashMode && window.location.hash === '') window.location.hash = '/';
    currentRoute.setCurrentRoute();
  }, [hashMode]);

  return state.currentComponent as JSX.Element;
});

export interface ILinkProps {
  /**
   * link url
   */
  to: string;
  /**
   * mark active only if to === currentLocation.fullPath instead of current global route regexp match
   */
  exact?: boolean;
  /**
   * Don't ignore hash when exact active
   */
  dontIgnoreHash?: boolean;
  /**
   * callback function that tells is link active or not
   */
  grabActive?: (active: boolean) => any;
  /**
   * class that applied when url related to this Link
   */
  activeClass?: string;
  children?: React.ReactNode;
  className?: string;
  htmlAttrs?: React.HTMLAttributes<HTMLAnchorElement>;

  [x: string]: any;
}

/**
 * Example `<Link to="/my_list_component" />`
 */
export const Link = observer(
  (props: ILinkProps) => {
    const {
      to,
      exact = false,
      dontIgnoreHash = false,
      grabActive = null,
      activeClass = null,
      children = null,
      className = null,
      htmlAttrs = {},
      ...restProps
    } = props;

    const [state] = useState(() => observable({
      active: false,
    }));

    const calcActive = useCallback(() => {
      const { currentRegExp, currentLocation } = currentRoute;

      let active = false;
      if (exact) {
        if (dontIgnoreHash && !currentRoute.hashMode) {
          active =
            to === currentLocation.fullPath + currentLocation.location.hash;
        } else {
          active = to === currentLocation.fullPath;
        }
      } else if (currentRegExp && currentRegExp.exec(to)) {
        active = true;
      }

      if (active !== state.active) {
        state.active = active;
        if (grabActive) grabActive(active);
      }
    }, [dontIgnoreHash, exact, grabActive, state, to]);

    useEffect(
      () => reaction(
        () => {
          const { currentRegExp, currentLocation } = currentRoute;

          return [to, exact, currentLocation, currentRegExp];
        },
        () => {
          calcActive();
        },
      ),
      [calcActive, exact, to],
    );

    const handleClick = useCallback((e) => {
      e.preventDefault();

      redirect(to);
    }, [to]);



    useState(() => calcActive());

    const classNames = [];
    if (className) classNames.push(className);
    if (activeClass && state.active) classNames.push(activeClass);

    return (
      <a {...restProps} {...htmlAttrs} className={classNames.join(' ')} href={to} data-active={state.active} onClick={handleClick}>
      {children}
      </a>
  );
  },
);

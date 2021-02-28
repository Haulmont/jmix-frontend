import {JmixRestConnection, PropertyType} from "@haulmont/jmix-rest";
import * as React from "react";
import {MainStore} from "./MainStore";
import {Provider} from "mobx-react";

let jmixAppContext: React.Context<JmixAppContextValue>;
let jmixAppConfig: JmixAppConfig | undefined;
let globalJmixREST: JmixRestConnection;
let mainStore: MainStore;

export interface JmixAppContextValue {
  jmixREST?: JmixRestConnection;
  config?: JmixAppConfig;
}

export function getJmixREST(): JmixRestConnection | undefined {
  return globalJmixREST;
}

export function getMainStore(): MainStore {
  return mainStore;
}

export function getJmixAppConfig(): JmixAppConfig | undefined {
  return jmixAppConfig;
}

export interface JmixAppConfig {
  /**
   * Serialization formats for entity properties of temporal types.
   * Can be used to override the default formats used to (de)serialize the data transferred by REST API.
   * See @{link https://momentjs.com/docs/#/displaying/ | Moment documentation}
   * for details on available formats.
   */
  dataTransferFormats?: Partial<Record<PropertyType, string>>;
  /**
   * Display formats for entity properties of temporal types.
   * Can be used to override the formats used for data presentation.
   * See @{link https://momentjs.com/docs/#/displaying/ | Moment documentation}
   * for details on available formats.
   */
  displayFormats?: Partial<Record<PropertyType, string>>;
}

export interface JmixAppProviderProps {
  /**
   * REST API facade
   */
  jmixREST: JmixRestConnection;
  children: React.ReactNode | React.ReactNode[] | null;
  /**
   * A callback that retrieves REST API token from an external storage.
   * Used, for example, in native mobile apps.
   *
   * @returns a promise that resolves into a `string` representing a valid REST API token
   * or `undefined` if no valid token is available.
   */
  retrieveRestApiToken?: () => Promise<string|undefined>;
  /**
   * Configuration object.
   */
  config?: JmixAppConfig;
}

export const JmixAppProvider: React.FC<JmixAppProviderProps> = (
  {
    jmixREST,
    children,
    retrieveRestApiToken = () => Promise.resolve(undefined),
    config
  }
) => {
  const JmixRestConnectionContext = getContext();
  return (
    <JmixRestConnectionContext.Consumer>
      {(context = {}) => {
        if (jmixREST && context.jmixREST !== jmixREST) {
          jmixAppConfig = config;
          globalJmixREST = jmixREST;
          mainStore = new MainStore(jmixREST);
          retrieveRestApiToken().then((restApiToken) => {
            if (restApiToken != null) {
              jmixREST.restApiToken = restApiToken;
            }
            mainStore.initialize();
          });
          context = Object.assign({}, context, {jmixREST});
        }

        if (!context.jmixREST) {
          throw new Error("jmixREST instance is not passed")
        }
        return (
          <JmixRestConnectionContext.Provider value={context}>
            <Provider mainStore={mainStore}>
              {children}
            </Provider>
          </JmixRestConnectionContext.Provider>
        );
      }}
    </JmixRestConnectionContext.Consumer>
  );
};

function getContext() {
  if (!jmixAppContext) {
    jmixAppContext = React.createContext<JmixAppContextValue>({});
  }
  return jmixAppContext;
}

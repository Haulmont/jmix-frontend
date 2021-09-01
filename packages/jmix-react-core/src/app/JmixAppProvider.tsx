import {JmixRestConnection} from "@haulmont/jmix-rest";
import React from "react";
import {MainStore} from "./MainStore";
import {Provider} from "mobx-react";
import { MetadataProvider } from "./MetadataProvider";
import { normalizeMetadata, ProjectModelMetadata } from "../util/normalizeMetadata";
import {ApolloClient} from "@apollo/client";
import { PropertyType } from "../data/PropertyType";
import {ContentDisplayMode} from "./ContentDisplayMode";

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
   * Short application name
   */
  appName?: string;
  /**
   * Storage that will be used by the application.
   * Defaults to `window.localStorage`.
   */
  storage?: Storage;
  /**
   * Client ID used during authentication.
   */
  clientId?: string;
  /**
   * Client secret used during authentication.
   */
  secret?: string;
  /**
   * Defaults to `/oauth/token`.
   */
  obtainTokenEndpoint?: string;
  /**
   * Defaults to `/oauth/revoke`.
   */
  revokeTokenEndpoint?: string;
  /**
   * Default locale. Defaults to `en`.
   */
  locale?: string;
  /**
   * Serialization formats for entity properties of temporal types.
   * Can be used to override the default formats used to (de)serialize the data transferred by server API.
   * See @{link https://day.js.org/docs/en/display/format | Day.js documentation}
   * for details on available formats.
   */
  dataTransferFormats?: Partial<Record<PropertyType, string>>;
  /**
   * Display formats for entity properties of temporal types.
   * Can be used to override the formats used for data presentation.
   * See {@link https://day.js.org/docs/en/display/format | Day.js documentation}
   * for details on available formats.
   */
  displayFormats?: Partial<Record<PropertyType, string>>;
  /**
   * Sets {@link MainStore.contentDisplayMode}.
   *
   * @defaultValue {@link ContentDisplayMode.ActivateExistingTab}
   */
  contentDisplayMode?: ContentDisplayMode;
}

export interface JmixAppProviderProps {
  metadata: ProjectModelMetadata,
  /**
   * REST API facade
   */
  jmixREST: JmixRestConnection;
  apolloClient: ApolloClient<unknown>;
  children: React.ReactNode | React.ReactNode[] | null;
  /**
   * A callback that retrieves REST API token from an external storage.
   * Used, for example, in native mobile apps.
   *
   * @returns a promise that resolves into a `string` representing a valid REST API token
   * or `undefined` if no valid token is available.
   */
  retrieveRestApiToken?: () => Promise<string|undefined>;
  Modals: React.ComponentType,
  /**
   * Configuration object.
   */
  config?: JmixAppConfig;
}

export const JmixAppProvider = ({
  apolloClient,
  jmixREST,
  children,
  retrieveRestApiToken = () => Promise.resolve(undefined),
  config,
  metadata,
  Modals
}: JmixAppProviderProps) => {
  const JmixRestConnectionContext = getContext();
  return (
    <JmixRestConnectionContext.Consumer>
      {(context = {}) => {
        if (jmixREST && context.jmixREST !== jmixREST) {
          jmixAppConfig = config;
          globalJmixREST = jmixREST;
          const {
            appName,
            storage,
            clientId,
            secret,
            obtainTokenEndpoint,
            revokeTokenEndpoint,
            locale,
            contentDisplayMode
          } = jmixAppConfig ?? {};
          mainStore = new MainStore(apolloClient, jmixREST, {
            appName,
            storage,
            clientId,
            secret,
            obtainTokenEndpoint,
            revokeTokenEndpoint,
            locale,
            contentDisplayMode
          });
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
            <MetadataProvider metadata={normalizeMetadata(metadata)}>
              <Provider mainStore={mainStore}>
                <Modals>
                  {children}
                </Modals>
              </Provider>
            </MetadataProvider>
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

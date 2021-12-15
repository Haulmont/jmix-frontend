import {action, autorun, computed, observable, makeObservable, reaction} from "mobx";
import {JmixRestConnection, EntityMessages, JmixRestError} from "@haulmont/jmix-rest";
import {inject, IWrappedComponent, MobXProviderContext} from "mobx-react";
import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {Security} from './Security';
import React from "react";
import { login, logout } from "./Auth";
import {ApolloClient, gql} from "@apollo/client";
import {ContentDisplayMode} from "./ContentDisplayMode";

export interface MainStoreOptions {
  appName?: string;
  storage?: Storage;
  clientId?: string;
  secret?: string;
  obtainTokenEndpoint?: string;
  revokeTokenEndpoint?: string;
  locale?: string;
  contentDisplayMode?: ContentDisplayMode;
  graphqlEndpoint?: string;
}

export class MainStore {

  static NAME = 'mainStore';
  static TOKEN_STORAGE_KEY = "jmixRestAccessToken";
  static LOCALE_STORAGE_KEY = 'jmixLocale';

  /**
   * Whether the `MainStore` instance is initialized.
   */
  initialized = false;
  /**
   * Whether the user authenticated.
   */
  authenticated = false;
  /**
   * Whether the user is anonymous.
   */
  usingAnonymously = false;
  userName: string | null = null;
  /**
   * Currently selected locale.
   */
  locale: string | null = null;
  /**
   * Localized entity messages.
   */
  messages: EntityMessages | null = null;
  /**
   * Localized enum messages.
   */
  enumMessages: EntityMessages | null = null;

  /**
   * See {@link ContentDisplayMode}
   */
  contentDisplayMode: ContentDisplayMode = ContentDisplayMode.ActivateExistingTab;

  security: Security;

  graphqlEndpoint: string;

  private messagesRequestCount = 0;

  private tokenExpiryListeners: Array<(() => void)> = [];
  private disposeTokenExpiryListener?: () => void;
  private localeChangeListeners: Array<((locale: string | null) => void)> = [];

  private appName: string;
  private storage: Storage;
  private clientId: string;
  private secret: string;
  private obtainTokenEndpoint: string;
  private revokeTokenEndpoint: string;

  constructor(
    private apolloClient: ApolloClient<unknown>,
    private jmixREST: JmixRestConnection,
    options?: MainStoreOptions
  ) {

    this.appName = options?.appName ?? '';
    this.storage = options?.storage ?? window.localStorage;
    this.clientId = options?.clientId ?? 'client';
    this.secret = options?.secret ?? 'secret';
    this.obtainTokenEndpoint = options?.obtainTokenEndpoint ?? '/oauth/token';
    this.revokeTokenEndpoint = options?.revokeTokenEndpoint ?? '/oauth/revoke';
    this.locale = options?.locale
      ?? this.storage.getItem(this.localeStorageKey)
      ?? 'en';
    this.graphqlEndpoint = options?.graphqlEndpoint ?? '/graphql';

    if (options?.contentDisplayMode != null) {
      this.contentDisplayMode = options.contentDisplayMode;
    }

    this.jmixREST.onLocaleChange(this.handleLocaleChange);
    this.security = new Security(this.apolloClient);

    makeObservable<MainStore, "handleLocaleChange">(this, {
      initialized: observable,
      authenticated: observable,
      usingAnonymously: observable,
      userName: observable,
      locale: observable,
      messages: observable,
      enumMessages: observable,
      contentDisplayMode: observable,
      initialize: action,
      loadMessages: action,
      loginRequired: computed,
      login: action,
      logout: action,
      handleLocaleChange: action
    });

    autorun(() => {
      if (this.initialized && (this.authenticated || this.usingAnonymously)) {
        this.security.loadPermissions();
        this.loadMessages();
      }
    })

    // Save locale to storage whenever it is changed
    autorun(() => {
      if (this.locale != null) {
        this.storage.setItem(this.localeStorageKey, this.locale);
        // TODO remove once REST is fully replaced by GraphQL.
        this.jmixREST.locale = this.locale;
      } else {
        this.storage.removeItem(this.localeStorageKey);
      }
    });

    reaction(() => this.locale, (locale) => {
      this.localeChangeListeners.forEach((onLocaleChanged) => onLocaleChanged(locale));
    });
  }

  get authToken(): string | null {
    return this.storage.getItem(this.tokenStorageKey);
  }

  set authToken(token: string | null) {
    if (token != null) {
      this.storage.setItem(this.tokenStorageKey, token);
      return;
    }

    this.storage.removeItem(this.tokenStorageKey);
  }

  get tokenStorageKey(): string {
    return this.appName + "_" + MainStore.TOKEN_STORAGE_KEY;
  }

  get localeStorageKey(): string {
    return this.appName + "_" + MainStore.LOCALE_STORAGE_KEY;
  }

  /**
   * `true` means that `MainStore` is in a state when entity data can be displayed (i.e. entity metadata,
   * localized entity messages, localized enums and permissions information has been loaded).
   */
  isEntityDataLoaded(): boolean {
    return this.messages != null
      && this.security.isDataLoaded;
  }

  /**
   * Retrieves localized entity messages using REST API.
   */
  loadMessages() {
    const requestId = ++this.messagesRequestCount;
    this.apolloClient.query<{
      entityMessages: [{key: string, value: string}],
      enumMessages: [{key: string, value: string}]
    }>({
      query: gql`query {
        entityMessages {
          key
          value
        }
        enumMessages {
          key
          value
        }
      }`
    })
      .then(action((resp) => {
        if (requestId === this.messagesRequestCount) {
          const {data: {entityMessages, enumMessages}} = resp;
          this.messages = entityMessages.reduce((acc, mes) => ({...acc, [mes.key]: mes.value}) , {});
          this.enumMessages = enumMessages.reduce((acc, mes) => ({...acc, [mes.key]: mes.value}) , {});
        }
      }));
  }

  get loginRequired(): boolean {
    return !this.authenticated && !this.usingAnonymously;
  }

  /**
   * Login using Jmix OAuth module.
   * Sends the request to obtain an access token,
   * saves it in the storage and sets the application state to "logged in".
   *
   * @param userName
   * @param password
   */
  login(userName: string, password: string): Promise<{ access_token: string }> {
    return login({
      userName,
      password,
      clientId: this.clientId,
      secret: this.secret,
      endpoint: this.obtainTokenEndpoint,
      locale: this.locale ?? undefined
    }).then(action((data) => {
      const {access_token} = data;

      this.authToken = access_token;

      this.userName = userName;
      this.authenticated = true;
      this.disposeTokenExpiryListener = this.onTokenExpiry(() => {
        this.authenticated = false;
      });

      return data;
    }));
  }

  /**
   * Login using a custom authentication method.
   * Saves an externally obtained token in the storage
   * and sets the application state to "logged in".
   *
   * @param userName
   * @param token
   */
  loginCustom(userName: string, token: string): void {
    this.authToken = token;
    this.userName = userName;
    this.authenticated = true;
    this.disposeTokenExpiryListener = this.onTokenExpiry(() => {
      this.authenticated = false;
    });
  }

  /**
   * Logout using Jmix OAuth module.
   * Sends the logout request, clears the stored access token
   * and sets the application state to "logged out".
   */
  logout(): Promise<void> {
    if (this.usingAnonymously) {
      this.usingAnonymously = false;
      return Promise.resolve();
    }

    if (this.authToken != null) {
      const token = this.authToken;
      this.authToken = null;

      return logout({
        clientId: this.clientId,
        secret: this.secret,
        token,
        endpoint: this.revokeTokenEndpoint,
        locale: this.locale ?? undefined
      }).then(action(() => {
          this.authenticated = false;
          this.userName = null;
          if (this.disposeTokenExpiryListener != null) {
            this.disposeTokenExpiryListener();
            this.disposeTokenExpiryListener = undefined;
          }
        }));
    }

    return Promise.resolve();
  }

  /**
   * Logout using a custom authentication method.
   * Clears the stored access token
   * and sets the application state to "logged out".
   */
  logoutCustom(): void {
    if (this.usingAnonymously) {
      this.usingAnonymously = false;
      return;
    }

    this.authToken = null;

    this.authenticated = false;
    this.userName = null;
    if (this.disposeTokenExpiryListener != null) {
      this.disposeTokenExpiryListener();
      this.disposeTokenExpiryListener = undefined;
    }
  }

  onTokenExpiry(c: () => void) {
    this.tokenExpiryListeners.push(c);
    return () => this.tokenExpiryListeners.splice(this.tokenExpiryListeners.indexOf(c), 1);
  }

  onLocaleChange(c: (locale: string | null) => void) {
    this.localeChangeListeners.push(c);
  }

  /**
   * Initializes this `MainStore` instance.
   *
   * @returns a promise that resolves when initialization is complete.
   */
  initialize(): Promise<void> {
    this.locale = this.jmixREST.locale;
    return this.apolloClient.query({
      query: gql`query {
        userInfo {
          username
          locale
        }
      }`
    })
      .then(action((resp) => {
        const {userInfo: {username}} = resp.data
        if (this.jmixREST.restApiToken == null) {
          this.usingAnonymously = true;
        } else {
          this.authenticated = true;
        }
        this.userName = username;
        this.initialized = true;
      }))
      .catch(action(() => {
        this.initialized = true;
      }));
  }

  private handleLocaleChange = action((locale: string) => {
    this.locale = locale;

    if (this.initialized && (this.authenticated || this.usingAnonymously)) {
      this.loadMessages();
    }

    if (this.initialized && this.authenticated) {
      this.setSessionLocale();
    }
  });

  private setSessionLocale = () => {
    this.jmixREST
      .setSessionLocale()
      .catch((error: JmixRestError) => {
        if (error.message === JmixRestConnection.NOT_SUPPORTED_BY_API_VERSION) {
          console.warn('Relogin is required in order for bean validation messages to use correct locale. ' +
            'Upgrade to REST API 7.2.0 or higher to be able to change locale without relogin.');
        } else {
          throw new Error('Failed to set session locale');
        }
      });
  };
}

export interface MainStoreInjected {
  mainStore?: MainStore;
}

export function injectMainStore<T extends IReactComponent>(target: T): T & IWrappedComponent<T> {
  return inject(MainStore.NAME)(target);
}

/**
 * A hook returning a {@link MainStore}
 */
export const useMainStore = (): MainStore => {
  const {mainStore} = React.useContext(MobXProviderContext);
  return mainStore;
};

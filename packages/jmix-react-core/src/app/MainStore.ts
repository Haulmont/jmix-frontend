import { action, autorun, computed, IObservableArray, observable, makeObservable } from "mobx";
import {JmixRestConnection, EntityMessages, EnumInfo, JmixRestError, MetaClassInfo, UserInfo} from "@haulmont/jmix-rest";
import {inject, IWrappedComponent, MobXProviderContext} from "mobx-react";
import {IReactComponent} from "mobx-react/dist/types/IReactComponent";
import {Security} from './Security';
import React from "react";
import { login, logout } from "./Auth";

export interface MainStoreOptions {
  appName?: string;
  storage?: Storage;
  clientId?: string;
  secret?: string;
  obtainTokenEndpoint?: string;
  revokeTokenEndpoint?: string;
  locale?: string;
}

export class MainStore {

  static NAME = 'mainStore';
  static TOKEN_STORAGE_KEY = "jmixRestAccessToken";

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
   * Information about project entities.
   */
  metadata: IObservableArray<MetaClassInfo> | null = null;
  /**
   * Localized entity messages.
   */
  messages: EntityMessages | null = null;
  /**
   * Localized enums.
   */
  enums: IObservableArray<EnumInfo> | null = null;

  security: Security;

  private metadataRequestCount = 0;
  private messagesRequestCount = 0;
  private enumsRequestCount = 0;

  private tokenExpiryListeners: Array<(() => void)> = [];
  private disposeTokenExpiryListener?: () => void;

  private appName: string;
  private storage: Storage;
  private clientId: string;
  private secret: string;
  private obtainTokenEndpoint: string;
  private revokeTokenEndpoint: string;

  constructor(
    private jmixREST: JmixRestConnection,
    options?: MainStoreOptions
  ) {

    this.appName = options?.appName ?? '';
    this.storage = options?.storage ?? window.localStorage;
    this.clientId = options?.clientId ?? 'client';
    this.secret = options?.secret ?? 'secret';
    this.obtainTokenEndpoint = options?.obtainTokenEndpoint ?? '/oauth/token';
    this.revokeTokenEndpoint = options?.revokeTokenEndpoint ?? '/oauth/revoke';
    this.locale = options?.locale ?? 'en';

    this.jmixREST.onLocaleChange(this.handleLocaleChange);
    this.security = new Security(this.jmixREST);

    makeObservable<MainStore, "handleLocaleChange">(this, {
      initialized: observable,
      authenticated: observable,
      usingAnonymously: observable,
      userName: observable,
      locale: observable,
      metadata: observable,
      messages: observable,
      enums: observable,
      loadEnums: action,
      loadMetadata: action,
      loadMessages: action,
      loginRequired: computed,
      login: action,
      logout: action,
      handleLocaleChange: action
    });

    autorun(() => {
      if (this.initialized && (this.authenticated || this.usingAnonymously)) {
        this.security.loadPermissions();
        this.loadEnums();
        this.loadMetadata();
        this.loadMessages();
      }
    })
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

  /**
   * `true` means that `MainStore` is in a state when entity data can be displayed (i.e. entity metadata,
   * localized entity messages, localized enums and permissions information has been loaded).
   */
  isEntityDataLoaded(): boolean {
    return this.messages != null
      && this.metadata != null
      && this.enums != null
      && this.security.isDataLoaded;
  }

  /**
   * Retrieves localized enums using REST API.
   */
  loadEnums() {
    const requestId = ++this.enumsRequestCount;
    this.jmixREST.loadEnums()
      .then(action((enums: EnumInfo[]) => {
        if (requestId === this.enumsRequestCount) {
          this.enums = observable(enums);
        }
      }));
  }

  /**
   * Retrieves entity metadata using REST API.
   */
  loadMetadata() {
    const requestId = ++this.metadataRequestCount;
    this.jmixREST.loadMetadata()
      .then(action((metadata: MetaClassInfo[]) => {
        if (requestId === this.metadataRequestCount) {
          this.metadata = observable(metadata);
        }
      }));
  }

  /**
   * Retrieves localized entity messages using REST API.
   */
  loadMessages() {
    const requestId = ++this.messagesRequestCount;
    this.jmixREST.loadEntitiesMessages()
      .then(action((res: EntityMessages) => {
        if (requestId === this.messagesRequestCount) {
          this.messages = res;
        }
      }))
  }

  /**
   * Changes the active locale for this frontend client application.
   *
   * @param locale - locale to be set as active.
   */
  setLocale = (locale: string) => {
    this.jmixREST.locale = locale;
  };

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

  /**
   * Initializes this `MainStore` instance.
   *
   * @returns a promise that resolves when initialization is complete.
   */
  initialize(): Promise<void> {
    this.locale = this.jmixREST.locale;
    return this.jmixREST.getUserInfo()
      .then(action((userInfo: UserInfo) => {
        if (this.jmixREST.restApiToken == null) {
          this.usingAnonymously = true;
        } else {
          this.authenticated = true;
        }
        this.userName = userInfo.name;
        this.initialized = true;
      }))
      .catch(action(() => {
        this.initialized = true;
      }));
  }

  private handleLocaleChange = (locale: string) => {
    this.locale = locale;

    if (this.initialized && (this.authenticated || this.usingAnonymously)) {
      this.loadEnums();
      this.loadMessages();
    }

    if (this.initialized && this.authenticated) {
      this.setSessionLocale();
    }
  };

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

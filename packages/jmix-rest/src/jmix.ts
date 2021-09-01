import {JmixRestError} from './error';
import {
  EffectivePermsInfo,
  EffectivePermsLoadOptions,
  EntitiesWithCount,
  EntityMessages,
  ICubaRestCheckStatusError,
  SerializedEntity,
  UserInfo,
  View,
} from './model';
import {DefaultStorage} from "./storage";
import {EntityFilter} from "./filter";
import {base64encode, encodeGetParams, matchesVersion, getStringId} from "./util";
import { restEventEmitter } from './event_emitter';

export * from './error';
export * from './model';
export * from './storage';
export * from './filter';
export * from './security';
export * from './event_emitter';
export * from './util';

const apps: JmixRestConnection[] = [];

/**
 * Initializes app.
 * @param {AppConfig} config
 * @returns {JmixRestConnection}
 */
export function initializeApp(config: AppConfig = {}): JmixRestConnection {
  if (getApp(config.name) != null) {
    throw new Error("Cuba app is already initialized");
  }
  const cubaApp = new JmixRestConnection(config.name, config.apiUrl, config.restClientId, config.restClientSecret,
    config.defaultLocale, config.storage, config.apiVersion);
  apps.push(cubaApp);
  return cubaApp;
}

/**
 * Retrieve previously initialized app by name.
 * @param {string} appName
 * @returns {JmixRestConnection | null}
 */
export function getApp(appName?: string): JmixRestConnection | null {
  const nameToSearch = appName == null ? "" : appName;
  for (const app of apps) {
    if (app.name === nameToSearch) {
      return app;
    }
  }
  return null;
}

export function removeApp(appName?: string): void {
  const app = getApp(appName);
  if (!app) {
    throw new Error('App is not found');
  }
  app.cleanup();
  apps.splice(apps.indexOf(app), 1);
}

export interface AppConfig {
  apiUrl?: string;
  name?: string;
  restClientId?: string;
  restClientSecret?: string;
  defaultLocale?: string;
  storage?: Storage;
  /**
   * REST API version number. Used by feature detection mechanism. If `apiVersion` is not provided
   * during construction, it will be determined lazily (the first time feature detection is required) by
   * making a request to a version endpoint. In either case, `apiVersion` is not updated automatically after it has been
   * initially acquired. If there is a need for such update (i.e. if client app shall become aware that a new version of
   * REST API has been deployed without browser refresh) {@link refreshApiVersion} method can be used.
   */
  apiVersion?: string;
}

export type ContentType = "text" | "json" | "blob" | "raw";
export type CommitMode = 'create' | 'edit';

export interface FetchOptions extends RequestInit {
  handleAs?: ContentType;
  commitMode?: CommitMode;
}

export interface EntitiesLoadOptions {
  view?: string;
  sort?: string;
  limit?: number;
  offset?: number;
}

export interface TokenOptions {
  tokenEndpoint?: string;
  revokeEndpoint?: string;
}

const throwNormolizedJmixRestError = (e: Error | JmixRestError) => {
  throw e.name === 'JmixRestError' ? e : new JmixRestError({message: e.message});
};

export class JmixRestConnection {

  public static NOT_SUPPORTED_BY_API_VERSION = 'Not supported by current REST API version';

  private static REST_TOKEN_STORAGE_KEY = "jmixRestAccessToken";
  private static USER_NAME_STORAGE_KEY = "jmixRestUserName";
  private static LOCALE_STORAGE_KEY = "jmixLocale";

  public messagesCache: EntityMessages;

  private tokenExpiryListeners: Array<(() => {})> = [];
  private messagesLoadingListeners: Array<((messages: EntityMessages) => {})> = [];
  private enumsLoadingListeners: Array<((enums: any[]) => {})> = [];
  private localeChangeListeners: Array<((locale: string) => {})> = [];

  constructor(public name = "",
              public apiUrl = "/rest/",
              public restClientId = "client",
              public restClientSecret = "secret",
              public defaultLocale = "en",
              private storage: Storage = new DefaultStorage(),
              public apiVersion?) {
  }

  get restApiToken(): string {
    return this.storage.getItem(this.name + "_" + JmixRestConnection.REST_TOKEN_STORAGE_KEY);
  }

  set restApiToken(token: string) {
    this.storage.setItem(this.name + "_" + JmixRestConnection.REST_TOKEN_STORAGE_KEY, token);
  }

  get locale(): string {
    const storedLocale = this.storage.getItem(this.name + "_" + JmixRestConnection.LOCALE_STORAGE_KEY);
    return storedLocale ? storedLocale : this.defaultLocale;
  }

  set locale(locale: string) {
    this.storage.setItem(this.name + "_" + JmixRestConnection.LOCALE_STORAGE_KEY, locale);
    this.localeChangeListeners.forEach((l) => l(this.locale));
  }

  /**
   * Logs in user and stores token in provided storage.
   * @param {string} login
   * @param {string} password
   * @param {TokenOptions} options You can use custom endpoints e.g. {tokenEndpoint:'ldap/token'}.
   * @returns {Promise<{access_token: string}>}
   */
  public login(login: string, password: string, options?: TokenOptions): Promise<{ access_token: string }> {
    if (login == null) {
      login = "";
    }
    if (password == null) {
      password = "";
    }
    const fetchOptions = {
      method: "POST",
      headers: this._getBasicAuthHeaders(),
      body: "grant_type=password&username=" + encodeURIComponent(login) + "&password=" + encodeURIComponent(password),
    };
    const defaultEndpoint = '/oauth/token';
    const endpoint = options?.tokenEndpoint ? options.tokenEndpoint : defaultEndpoint;
    const loginRes = fetch(endpoint, fetchOptions)
      .then(this.checkStatus)
      .then((resp) => resp.json())
      .then((data) => {
        this.restApiToken = data.access_token;
        return data;
      })
      .catch(throwNormolizedJmixRestError);
    return loginRes;
  }

  public logout(options?: TokenOptions): Promise<any> {
    return this.revokeToken(this.restApiToken, options?.revokeEndpoint);
  }

  public revokeToken(token: string, revokeEndpoint?: string): Promise<any> {
    const fetchOptions = {
      method: 'POST',
      headers: this._getBasicAuthHeaders(),
      body: 'token=' + encodeURIComponent(token),
    };
    const defaultEndpoint = '/oauth/revoke';
    const endpoint = revokeEndpoint ? revokeEndpoint : defaultEndpoint;
    this.clearAuthData();
    return fetch(endpoint, fetchOptions)
      .then(this.checkStatus)
      .catch(throwNormolizedJmixRestError);
  }

  public loadEntities<T>(
    entityName: string,
    options?: EntitiesLoadOptions,
    fetchOptions?: FetchOptions
  ): Promise<Array<SerializedEntity<T>>> {
    return this.fetch('GET', 'entities/' + entityName, options, {handleAs: 'json', ...fetchOptions});
  }

  public loadEntitiesWithCount<T>(
    entityName: string,
    options?: EntitiesLoadOptions,
    fetchOptions?: FetchOptions
  ): Promise<EntitiesWithCount<T>> {
    let count;
    const optionsWithCount = {...options, returnCount: true};
    return this.fetch('GET', `entities/${entityName}`, optionsWithCount, {handleAs: 'raw', ...fetchOptions})
      .then((response: Response) => {
        count = parseInt(response.headers.get('X-Total-Count'), 10);
        return response.json();
      }).then((result: Array<SerializedEntity<T>>) => ({result, count}));
  }

  public searchEntities<T>(
    entityName: string,
    entityFilter: EntityFilter,
    options?: EntitiesLoadOptions,
    fetchOptions?: FetchOptions
  ): Promise<Array<SerializedEntity<T>>> {
    const data = {...options, filter: entityFilter};
    return this.fetch('GET', 'entities/' + entityName + '/search', data, {handleAs: 'json', ...fetchOptions});
  }

  public searchEntitiesWithCount<T>(
    entityName: string,
    entityFilter: EntityFilter,
    options?: EntitiesLoadOptions,
    fetchOptions?: FetchOptions
  ): Promise<EntitiesWithCount<T>> {
    let count;
    const optionsWithCount = {...options, filter: entityFilter, returnCount: true};
    return this.fetch(
        'GET',
        'entities/' + entityName + '/search',
        optionsWithCount,
        { handleAs: 'raw', ...fetchOptions }
      ).then((response: Response) => {
        count = parseInt(response.headers.get('X-Total-Count'), 10);
        return response.json();
      }).then((result: Array<SerializedEntity<T>>) => ({result, count}));
  }

  public loadEntity<T>(
    entityName: string,
    id : string | object,
    options?: { view?: string },
    fetchOptions?: FetchOptions
  ): Promise<SerializedEntity<T>> {
    return this.fetch('GET', 'entities/' + entityName + '/' + getStringId(id), options, {handleAs: 'json', ...fetchOptions});
  }

  public deleteEntity(entityName: string, id: string | object, fetchOptions?: FetchOptions): Promise<void> {
    return this.fetch('DELETE', 'entities/' + entityName + '/' + getStringId(id), null, fetchOptions);
  }

  public commitEntity<T extends {id?: string | object}>(
    entityName: string,
    entity: T,
    fetchOptions?: FetchOptions
  ): Promise<Partial<T>> {
    const {commitMode} = fetchOptions ?? {};
    if (commitMode === 'edit' || (commitMode == null && entity.id != null)) {
      return this.fetch('PUT', 'entities/' + entityName + '/' + getStringId(entity.id), JSON.stringify(entity),
        {handleAs: 'json', ...fetchOptions});
    } else {
      return this.fetch<Partial<T>>(
        'POST',
        'entities/' + entityName, JSON.stringify(entity),
        {handleAs: 'json', ...fetchOptions},
      );
    }
  }

  public invokeService<T>(
    serviceName: string,
    methodName: string,
    params: any,
    fetchOptions?: FetchOptions
  ): Promise<T> {
    const serializedParams = params != null ? JSON.stringify(params) : null;
    return this.fetch('POST', 'services/' + serviceName + '/' + methodName, serializedParams, fetchOptions);
  }

  public query<T>(
    entityName: string,
    queryName: string,
    params?: any,
    fetchOptions?: FetchOptions
  ): Promise<Array<SerializedEntity<T>>> {
    return this.fetch('GET', 'queries/' + entityName + '/' + queryName, params, {handleAs: 'json', ...fetchOptions});
  }

  public queryWithCount<T>(entityName: string, queryName: string, params?: any,
                           fetchOptions?: FetchOptions): Promise<EntitiesWithCount<T>> {
    let count;
    const paramsWithCount = {...params, returnCount: true};
    return this.fetch('GET', `queries/${entityName}/${queryName}`, paramsWithCount,
      {handleAs: 'raw', ...fetchOptions})
      .then((response: Response) => {
        count = parseInt(response.headers.get('X-Total-Count'), 10);
        return response.json();
      })
      .then((result: Array<SerializedEntity<T>>) => ({result, count}));
  }

  public queryCount(entityName: string, queryName: string, params?: any, fetchOptions?: FetchOptions): Promise<number> {
    return this.fetch('GET', 'queries/' + entityName + '/' + queryName + '/count', params, fetchOptions);
  }

  public loadEntityViews(entityName: string, fetchOptions?: FetchOptions): Promise<View[]> {
    return this.fetch('GET', 'metadata/entities/' + entityName + '/views', null,
      {handleAs: 'json', ...fetchOptions});
  }

  public loadEntityView(entityName: string, viewName: string, fetchOptions?: FetchOptions): Promise<View> {
    return this.fetch('GET', 'metadata/entities/' + entityName + '/views/' + viewName + '/', null,
      {handleAs: 'json', ...fetchOptions});
  }

  public loadEntitiesMessages(fetchOptions?: FetchOptions): Promise<EntityMessages> {
    const fetchRes = this.fetch<EntityMessages>('GET', 'messages/entities', null,
      {handleAs: 'json', ...fetchOptions});
    fetchRes.then((messages) => {
      this.messagesCache = messages;
      this.messagesLoadingListeners.forEach((l) => l(messages));
    });
    return fetchRes;
  }

  public getEffectivePermissions(effectivePermsLoadOptions?: EffectivePermsLoadOptions, fetchOptions?: FetchOptions)
    : Promise<EffectivePermsInfo> {

    const loadOpts = {
      entities: true,
      entityAttributes: true,
      specifics: true,
      ... effectivePermsLoadOptions
    };

    return this.fetchJson('GET', 'permissions', loadOpts, fetchOptions);
  }

  public getUserInfo(fetchOptions?: FetchOptions): Promise<UserInfo> {
    return this.fetch('GET', 'userInfo', null, {handleAs: 'json', ...fetchOptions});
  }

  public getFileUploadURL(): string {
    return this.apiUrl + 'files';
  }

  public getFile(fileRef: string, fetchOptions?: FetchOptions): Promise<Blob> {
    return this.fetch('GET', 'files?fileRef=' + fileRef, null, {handleAs: 'blob', ...fetchOptions});
  }

  /**
   * Shorthand for {@link fetch} that already has 'json' as default 'handleAs' property
   */
  public fetchJson<T>(method: string, path: string, data?: any, fetchOptions?: FetchOptions): Promise<T> {
    return this.fetch(method, path, data, {handleAs: 'json', ...fetchOptions});
  }

  public fetch<T>(method: string, path: string, data?: any, fetchOptions?: FetchOptions): Promise<T> {
    let url = this.apiUrl + path;
    const settings: FetchOptions = {
      method,
      headers: {
        "Accept-Language": this.locale,
      },
      ...fetchOptions,
    };
    if (this.restApiToken) {
      settings.headers["Authorization"] = "Bearer " + this.restApiToken;
    }
    if (method === 'POST' || method === 'PUT') {
      settings.body = data;
      settings.headers["Content-Type"] = "application/json; charset=UTF-8";
    }
    if (method === 'GET' && data && Object.keys(data).length > 0) {
      url += '?' + encodeGetParams(data);
    }
    const handleAs: ContentType = fetchOptions ? fetchOptions.handleAs : undefined;
    switch (handleAs) {
      case "text":
        settings.headers["Accept"] = "text/html";
        break;
      case "json":
        settings.headers["Accept"] = "application/json";
        break;
    }

    const fetchRes = fetch(url, settings).then(this.checkStatus);

    fetchRes.catch((error: ICubaRestCheckStatusError) => {
          restEventEmitter.emit('fetch_fail', error);

          if (this.isTokenExpiredResponse(error.response)) {
            this.clearAuthData();
            this.tokenExpiryListeners.forEach((l) => l());
          }
      });

    return fetchRes.then((resp) => {

      if (resp.status === 204) {
        return resp.text();
      }

      switch (handleAs) {
        case "text":
          return resp.text();
        case "blob":
          return resp.blob();
        case "json":
          return resp.json();
        case "raw":
          return resp;
        default:
          return resp.text();
      }
    }).catch(throwNormolizedJmixRestError);
  }

  public onLocaleChange(c) {
    this.localeChangeListeners.push(c);
    return () => this.localeChangeListeners.splice(this.localeChangeListeners.indexOf(c), 1);
  }

  public onTokenExpiry(c) {
    this.tokenExpiryListeners.push(c);
    return () => this.tokenExpiryListeners.splice(this.tokenExpiryListeners.indexOf(c), 1);
  }

  public onEnumsLoaded(c) {
    this.enumsLoadingListeners.push(c);
    return () => this.enumsLoadingListeners.splice(this.enumsLoadingListeners.indexOf(c), 1);
  }

  public onMessagesLoaded(c) {
    this.messagesLoadingListeners.push(c);
    return () => this.messagesLoadingListeners.splice(this.messagesLoadingListeners.indexOf(c), 1);
  }

  public cleanup() {
    this.storage.clear();
  }

  /**
   * @since Jmix REST 0.7.0, Generic REST API 7.2.0
   */
  public setSessionLocale(): Promise<void> {
    return this.requestIfSupported('7.2.0', () => this.fetch('PUT', 'user-session/locale'));
  }

  /**
   * Returns REST API version number without performing side effects
   *
   * @returns REST API version number
   */
  public getApiVersion(fetchOptions?: FetchOptions): Promise<string> {
    return this.fetch('GET', 'version', null, {handleAs: 'text', ...fetchOptions});
  }

  /**
   * Updates stored REST API version number (which is used in feature detection mechanism)
   * with a value acquired by making a request to a version endpoint, and returns an updated value.
   *
   * @returns REST API version number
   */
  public refreshApiVersion(): Promise<string> {
    return this.getApiVersion().then((version) => {
      this.apiVersion = version;
      return this.apiVersion;
    }).catch((err) => {
      if (err && err.response && err.response.status === 404) {
        // REST API doesn't have a version endpoint.
        // It means that version is less than 7.2.0 where feature detection was first introduced.
        // Return version as '0' so that comparison with a required version always result
        // in actual version being less than required version.
        this.apiVersion = '0';
        return this.apiVersion;
      } else {
        throw err;
      }
    });
  }

  /**
   * @deprecated todo not need when we work with jmix-rest
   * @param minVersion
   * @param requestCallback
   * @private
   */
  private async requestIfSupported(minVersion: string, requestCallback: () => Promise<unknown>): Promise<any> {
    if (await this.isFeatureSupported(minVersion)) {
      return requestCallback();
    } else {
      const error = new JmixRestError({
        message: JmixRestConnection.NOT_SUPPORTED_BY_API_VERSION,
      });

      return Promise.reject(error);
    }
  }

  private async isFeatureSupported(minVersion: string): Promise<boolean> {
    if (!this.apiVersion) {
      await this.refreshApiVersion();
    }
    return matchesVersion(this.apiVersion, minVersion);
  }

  private isTokenExpiredResponse(resp: Response): boolean {
    return resp && resp.status === 401;
    // && resp.responseJSON
    // && resp.responseJSON.error === 'invalid_token';
  }

  private _getBasicAuthHeaders(): { [header: string]: string } {
    return getBasicAuthHeaders(this.restClientId, this.restClientSecret, this.locale);
  }

  private checkStatus(response: Response): any {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new JmixRestError({
        message: response.statusText,
        response,
      });

      return Promise.reject(error);
    }
  }

  private clearAuthData(): void {
    this.storage.removeItem(this.name + "_" + JmixRestConnection.REST_TOKEN_STORAGE_KEY);
    this.storage.removeItem(this.name + "_" + JmixRestConnection.USER_NAME_STORAGE_KEY);
  }

}

export function getBasicAuthHeaders(client: string, secret: string, locale = 'en'): { [header: string]: string } {
  return {
    "Accept-Language": locale,
    "Authorization": "Basic " + base64encode(client + ':' + secret),
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
}

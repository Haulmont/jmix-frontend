import {createJmixServerError, JmixServerError} from "./JmixServerError";
import {base64encode} from "../util/base64";

export interface CommonAuthOptions {
  endpoint: string;
  /**
   * Can be used to customize the request (use custom headers, etc.)
   */
  fetchOptions?: RequestInit;
  clientId: string;
  secret: string;
  locale?: string;
}

export interface LoginOptions extends CommonAuthOptions {
  userName: string;
  password: string;
}

export interface LogoutOptions extends CommonAuthOptions {
  token: string;
}

export function login(options: LoginOptions): Promise<{ access_token: string }> {
  const {
    userName,
    password,
    endpoint,
    clientId,
    secret,
    locale,
    fetchOptions = getDefaultLoginFetchOptions(userName, password, clientId, secret, locale),
  } = options;

  return fetch(endpoint, fetchOptions)
    .then(checkResponseStatus)
    .then((resp) => (resp as Response).json());
}

export function getDefaultLoginFetchOptions(
  userName: string, password: string, clientId: string, secret: string, locale?: string
) {
  return {
    method: "POST",
    headers: getBasicAuthHeaders(clientId, secret, locale),
    body: `grant_type=password&username=${encodeURIComponent(userName)}&password=${encodeURIComponent(password)}`,
  };
}

export function logout(options: LogoutOptions) {
  const {
    clientId,
    secret,
    endpoint,
    token,
    locale,
    fetchOptions = getDefaultLogoutFetchOptions(token, clientId, secret, locale)
  } = options;

  return fetch(endpoint, fetchOptions)
    .then(checkResponseStatus);
}

export function getDefaultLogoutFetchOptions(
  token: string, clientId: string, secret: string, locale?: string
) {
  return {
    method: 'POST',
    headers: getBasicAuthHeaders(clientId, secret, locale),
    body: `token=${encodeURIComponent(token)}`,
  };
}

export function getBasicAuthHeaders(client: string, secret: string, locale = 'en'): { [header: string]: string } {
  return {
    "Accept-Language": locale,
    "Authorization": "Basic " + base64encode(client + ':' + secret),
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  };
}

export function checkResponseStatus(response: Response): Promise<Response | JmixServerError> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(
      createJmixServerError(response)
    );
  }
}

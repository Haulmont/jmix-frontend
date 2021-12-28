import {checkResponseStatus, getBasicAuthHeaders, login, logout} from "./Auth";
import {createJmixServerError} from "./JmixServerError";
// polyfill Response object:
import 'isomorphic-fetch';
import Mock = jest.Mock;

describe('getBasicAuthHeaders()', () => {
  it('returns correct headers', () => {
    const header = getBasicAuthHeaders('client', 'secret', 'en');
    expect(header).toEqual({
      "Accept-Language": "en",
      "Authorization": "Basic Y2xpZW50OnNlY3JldA==",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    });
  });

  it('returns correct headers with default locale', () => {
    const header = getBasicAuthHeaders('client', 'secret');
    expect(header).toEqual({
      "Accept-Language": "en",
      "Authorization": "Basic Y2xpZW50OnNlY3JldA==",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    });
  });
});

describe('checkResponseStatus()', () => {
  it('returns response if status code is 2xx', async () => {
    const response200 = new Response(null, {status: 200});
    const response201 = new Response(null, {status: 201});
    const response204 = new Response(null, {status: 204});

    expect.assertions(3);
    await expect(checkResponseStatus(response200))
      .resolves
      .toEqual(response200);
    await expect(checkResponseStatus(response201))
      .resolves
      .toEqual(response201);
    await expect(checkResponseStatus(response204))
      .resolves
      .toEqual(response204);
  });

  it('returns a rejected promise if status code is other than 2xx', async () => {
    const response300 = new Response(null, {status: 300});

    expect.assertions(1);
    await expect(checkResponseStatus(response300))
      .rejects
      .toMatchObject({
        "name": "JmixServerError"
      });
  });
});

describe('login()', () => {
  const realFetch = window.fetch;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    mockFetch.mockImplementation(loginFetchImpl);
    window.fetch = mockFetch;
  });

  afterAll(() => {
    window.fetch = realFetch;
  });

  it('sends correctly formed request', async () => {
    await login({
      userName: 'userName', password: 'password',
      clientId: "client", secret: "secret", endpoint: "/oauth/token", locale: 'en',
    });
    expect(mockFetch.mock.calls[0][0]).toEqual('/oauth/token');
    expect(mockFetch.mock.calls[0][1].method).toEqual('POST');
    expect(mockFetch.mock.calls[0][1].headers).toEqual({
      "Accept-Language": "en",
      "Authorization": "Basic Y2xpZW50OnNlY3JldA==",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    });
    expect(mockFetch.mock.calls[0][1].body).toEqual(
      'grant_type=password&username=userName&password=password'
    );
  });

  it('returns access token on success', async () => {
    const {access_token} = await login({
      userName: 'userName', password: 'password',
      clientId: "client", secret: "secret", endpoint: "/oauth/token", locale: 'en',
    });
    expect(access_token).toBe('validToken');
  });

  it('rejects with JmixServerError on failure', async () => {
    await expect(login({
      userName: 'userName', password: 'password',
      clientId: "client", secret: "secret", endpoint: "/wrong/endpoint", locale: 'en',
    })).rejects
      .toMatchObject({
        "name": "JmixServerError"
      });
  });

  it('uses default locale if not provided explicitly', async () => {
    await expect(login({
      userName: 'userName', password: 'password',
      clientId: "client", secret: "secret", endpoint: "/oauth/token",
    }));
    expect(mockFetch.mock.calls[0][1].headers['Accept-Language']).toEqual('en');
  });

  it('allows to customize the request', async () => {
    await expect(login({
      userName: 'userName', password: 'password',
      clientId: "client", secret: "secret", endpoint: "/oauth/token",
      fetchOptions: {
        body: 'custom body'
      }
    }));
    expect(mockFetch.mock.calls[0][1].body).toEqual('custom body');
  });
});

describe('logout()', () => {
  const realFetch = window.fetch;
  let mockFetch: Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    mockFetch.mockImplementation(logoutFetchImpl);
    window.fetch = mockFetch;
  });

  afterAll(() => {
    window.fetch = realFetch;
  });

  it('sends correctly formed request', async () => {
    await logout({
      token: 'token',
      clientId: "client", secret: "secret", endpoint: "/oauth/revoke", locale: 'en',
    });
    expect(mockFetch.mock.calls[0][0]).toEqual('/oauth/revoke');
    expect(mockFetch.mock.calls[0][1].method).toEqual('POST');
    expect(mockFetch.mock.calls[0][1].headers).toEqual({
      "Accept-Language": "en",
      "Authorization": "Basic Y2xpZW50OnNlY3JldA==",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    });
    expect(mockFetch.mock.calls[0][1].body).toEqual(
      'token=token'
    );
  });

  it('uses default locale if not provided explicitly', async () => {
    await expect(logout({
      token: 'token',
      clientId: "client", secret: "secret", endpoint: "/oauth/revoke",
    }));
    expect(mockFetch.mock.calls[0][1].headers['Accept-Language']).toEqual('en');
  });

  it('allows to customize the request', async () => {
    await expect(logout({
      token: 'token',
      clientId: "client", secret: "secret", endpoint: "/oauth/revoke",
      fetchOptions: {
        body: 'custom body'
      }
    }));
    expect(mockFetch.mock.calls[0][1].body).toEqual('custom body');
  });
});

const loginFetchImpl = (endpoint: string) => {
  let response;

  if (endpoint === '/oauth/token') {
    response = new Response(null, {status: 200});
    response.json = () => Promise.resolve({access_token: 'validToken'});
    return Promise.resolve(response);
  }

  response = new Response(null, {status: 404});
  return Promise.reject(
    createJmixServerError(response)
  );
};

const logoutFetchImpl = (endpoint: string) => {
  let response;

  if (endpoint === '/oauth/revoke') {
    response = new Response(null, {status: 200});
    response.json = () => Promise.resolve({});
    return Promise.resolve(response);
  }

  response = new Response(null, {status: 404});
  return Promise.reject(
    createJmixServerError(response)
  );
};
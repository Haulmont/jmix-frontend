import {WebStorageStub} from "../test-doubles/WebStorageStub";
import { MainStore } from "./MainStore";
import {JmixRestConnection} from "@haulmont/jmix-rest";
import {ApolloClient, InMemoryCache} from "@apollo/client";
import {MockLink} from "@apollo/client/testing";

describe('MainStore', () => {
  it('stores auth token in the provided storage', () => {
    const storage = new WebStorageStub();
    const mainStore = new MainStore(createMockApolloClient(), new JmixRestConnection(), {
      appName: 'scr-jmix',
      storage
    });
    expect(storage.getItem('scr-jmix_jmixRestAccessToken')).toBe(null);
    mainStore.authToken = 'token';
    expect(mainStore.authToken).toBe('token');
    expect(storage.getItem('scr-jmix_jmixRestAccessToken')).toBe('token');
    mainStore.authToken = null;
    expect(mainStore.authToken).toBe(null);
    expect(storage.getItem('scr-jmix_jmixRestAccessToken')).toBe(null);
  });

  it('allows to login and logout using a custom auth method', () => {
    const storage = new WebStorageStub();
    const mainStore = new MainStore(createMockApolloClient(), new JmixRestConnection(), {
      appName: 'scr-jmix',
      storage
    });

    // Initial state
    expect(mainStore.authToken).toBe(null);
    expect(storage.getItem('scr-jmix_jmixRestAccessToken')).toBe(null);
    expect(mainStore.authenticated).toBe(false);
    expect(mainStore.userName).toBe(null);

    // Login with externally obtained token
    mainStore.loginCustom('userName', 'token');
    expect(mainStore.authToken).toBe('token');
    expect(storage.getItem('scr-jmix_jmixRestAccessToken')).toBe('token');
    expect(mainStore.authenticated).toBe(true);
    expect(mainStore.userName).toBe('userName');

    // Logout
    mainStore.logoutCustom();
    expect(mainStore.authToken).toBe(null);
    expect(storage.getItem('scr-jmix_jmixRestAccessToken')).toBe(null);
    expect(mainStore.authenticated).toBe(false);
    expect(mainStore.userName).toBe(null);
  });
});

function createMockApolloClient() {
  return new ApolloClient<{}>({
    link: new MockLink([]),
    cache: new InMemoryCache({})
  });
}
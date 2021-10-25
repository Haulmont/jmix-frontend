import {ApolloCache, ApolloClient, ApolloClientOptions, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import { createUploadLink } from 'apollo-upload-client';

export interface JmixApolloConfig<TCacheShape> {
  /**
   * Apollo client options that will be spread into the default options before passing them to `new ApolloClient()`.
   * This allows to add options to the default configuration, as well as to override the default options.
   * IMPORTANT: some features of Jmix frontend may not work correctly when default options are overridden!
   */
  customApolloOptions?: ApolloClientOptions<TCacheShape>;
  /**
   * A Web Storage API compliant storage that will be used to store data such as access token, selected locale, etc.
   *
   * @defaultValue `window.localStorage`.
   */
  storage?: Storage;
  /**
   * Access token {@link storage} key.
   *
   * @defaultValue `jmixRestAccessToken`
   */
  tokenStorageKey?: string;
  /**
   * Locale {@link storage} key.
   *
   * @defaultValue `jmixLocale`
   */
  localeStorageKey?: string;
  /**
   * @defaultValue `/graphql`
   */
  graphqlEndpoint?: string;
}

export function initializeApolloClient<TCacheShape>(config: JmixApolloConfig<TCacheShape> = {}): ApolloClient<TCacheShape> {

  const {
    customApolloOptions = {},
    storage = window.localStorage,
    graphqlEndpoint = '/graphql',
    // TODO Rename to jmixAccessToken once REST is dropped
    tokenStorageKey = 'jmixRestAccessToken',
    localeStorageKey = 'jmixLocale'
  } = config;

  const uploadLink = createUploadLink({
    uri: graphqlEndpoint
  });

  const authLink = setContext((_, { headers }) => {
    const token = storage.getItem(tokenStorageKey);
    const locale = storage.getItem(localeStorageKey);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        'Accept-Language': locale
      }
    };
  });

  return new ApolloClient<TCacheShape>({
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache({
      addTypename: false
    }) as unknown as ApolloCache<TCacheShape>,
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only'
      },
      watchQuery: {
        fetchPolicy: "cache-and-network"
      }
    },
    ...customApolloOptions
  });
}

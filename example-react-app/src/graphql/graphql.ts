import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GRAPHQL_URI } from "../config";

export interface ApolloClientConfig {
  storage?: Storage;
}

export const createApolloClient = (config: ApolloClientConfig = {}) => {
  const { storage = window.localStorage } = config;

  const httpLink = createHttpLink({
    uri: GRAPHQL_URI
  });

  const authLink = setContext((_, { headers }) => {
    const token = storage.getItem("scr-jmix_jmixRestAccessToken");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false // TODO remove once backend is fixed
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network"
      }
    }
  });
};

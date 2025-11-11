import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { apiUrl } from "../config/environment";

const uri = new URL("graphql", apiUrl).toString();

const httpLink = new HttpLink({ uri });

const link = ApolloLink.from([httpLink]);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network" as const,
    errorPolicy: "ignore" as const,
  },
  query: {
    fetchPolicy: "network-only" as const,
    errorPolicy: "all" as const,
  },
};

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache,
  defaultOptions,
});

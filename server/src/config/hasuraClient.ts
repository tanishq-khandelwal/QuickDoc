import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import dotenv from 'dotenv';

dotenv.config();

const HASURA_GRAPHQL_URL = process.env.HASURA_GRAPHQL_URL!;
const HASURA_ADMIN_SECRET = process.env.HASURA_ADMIN_SECRET!;

const httpLink = new HttpLink({
  uri: HASURA_GRAPHQL_URL,
  headers: {
    "x-hasura-admin-secret": HASURA_ADMIN_SECRET,
  },
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

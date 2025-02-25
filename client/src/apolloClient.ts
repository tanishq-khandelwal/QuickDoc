import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Function to extract the JWT token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(row => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

// HTTP Link for GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'http://localhost:8080/v1/graphql',
  credentials: 'include', // Ensures cookies are sent with requests
});

// Middleware to dynamically attach Authorization header
const authLink = setContext((_, { headers }) => {
  const token = getTokenFromCookies();
  return {
    headers: {
      ...headers,
      // "x-hasura-admin-secret": "Tsk_2003",
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Function to get the token from localStorage
const getTokenFromLocalStorage = () => {
  return localStorage.getItem("token"); // Assuming 'token' is the key in localStorage
};

// HTTP Link for GraphQL endpoint
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  credentials: "include", // Ensures cookies are sent with requests
});

// Middleware to dynamically attach Authorization header
const authLink = setContext((_, { headers }) => {
  const token = getTokenFromLocalStorage();
  console.log("Token:", token);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;

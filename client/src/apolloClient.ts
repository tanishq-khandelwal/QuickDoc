import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Function to extract the JWT token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find(row => row.startsWith("token="));
  return tokenCookie ? tokenCookie.split("=")[1] : null;
};

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
    credentials: 'include', // Ensures cookies are sent with requests
    headers: {
      "x-hasura-admin-secret": "Tsk_2003",
      "Authorization": `Bearer ${getTokenFromCookies()}`, // Read token dynamically from cookies
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:8080/v1/graphql',
    headers: {
        "x-hasura-admin-secret": "Tsk_2003",
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add your token
    },
  }),
  cache: new InMemoryCache(),
});

export default client;

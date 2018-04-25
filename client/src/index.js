import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';

import ApolloClient from 'apollo-client/ApolloClient';
import { HttpLink } from 'apollo-link-http/lib/httpLink';
import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache';
import ApolloProvider from 'react-apollo/ApolloProvider';

const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.scss';

import ApolloClient from 'apollo-client/ApolloClient';
import { HttpLink } from 'apollo-link-http/lib/httpLink';
import { InMemoryCache } from 'apollo-cache-inmemory/lib/inMemoryCache';
import ApolloProvider from 'react-apollo/ApolloProvider';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      updateAccessToken: (root, { accessToken }, { cache }) => {
        const data = {
          accessToken: {
            __typename: 'accessToken',
            accessToken
          }
        };
        cache.writeData({ data });
      }
    }
  },
  defaults: {
    accessToken: {
      __typename: 'accessToken',
      accessToken: null
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([ stateLink, new HttpLink({ uri: '/graphql' }) ]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);

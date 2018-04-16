import React, { Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './App.scss';

const App = ({ data }) => (
  <Fragment>
    <div className='thumbnail-container'>
      {
        data.techs &&
          data.techs.map(item => (
            <div key={item.id} className='tech-item-card'>
              <div
                className='tech-item-logo'
                style={{ backgroundImage: `url(${item.image})` }}
              />
              {item.name}
            </div>
          ))
      }
    </div>
  </Fragment>
);

export default graphql(
  gql`
    query myQuery {
      techs {
        name
        id
        image
      }
    }
  `
)(App);

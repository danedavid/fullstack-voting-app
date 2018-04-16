import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './App.scss';

const App = (props) => {
  console.log(props);

  return (
    <div className='thumbnail-container'>
      {
        props.data.techs &&
          props.data.techs.map(item => (
            <div key={item.id} className='tech-item-card'>
              {item.name}
            </div>
          ))
      }
    </div>
  );
}

export default graphql(
  gql`
    query myQuery {
      techs {
        name
        id
      }
    }
  `
)(App);

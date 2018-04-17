import React, { Component, Fragment } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedId: 'react'
    };
  }

  handleClick(id) {
    const { selectedId } = this.state;
    if ( selectedId === id ) {
      this.setState({ selectedId: null });
      return;
    }
    this.setState({ selectedId: id });
  }

  render() {
    const { data } = this.props;
    const { selectedId } = this.state;

    return (
      <Fragment>
        <div className='header'>Voting App</div>
        <div className='thumbnail-container'>
          {
            !data.techs &&
              <div>Loading...</div>
          }
          {
            data.techs &&
              data.techs.map(({ id, name, image }) => (
                <div
                  key={id}
                  className={'tech-item-card' + (selectedId === id ? ' selected-card': '')}
                  onClick={this.handleClick.bind(this, id)}
                >
                  <div
                    className='tech-item-logo'
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <span className='tech-item-name'>{name}</span>
                </div>
              ))
          }
        </div>
        {
          selectedId &&
            <div className='vote-button-container'>
              <button className='vote-button'>Vote!</button>
            </div>
        }
      </Fragment>
    );
  }
}

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

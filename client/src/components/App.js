import React, { Component, Fragment } from 'react';
import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import './App.scss';

const UPVOTE = gql`
  mutation upvote($id: String!) {
    upvote(id: $id) {
      votes
    }
  }
`;

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
            <Mutation mutation={UPVOTE}>
              {
                (upvote, { data, loading, called }) => (
                  <div className='vote-button-container'>
                    <button
                      disabled={called}
                      className='vote-button'
                      onClick={() => upvote({ variables: { id: selectedId }})}
                    >
                      { loading ? 'Loading...' : called ? 'Voted!' : 'Vote!' }
                    </button>
                  </div>
                )
              }
            </Mutation>
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

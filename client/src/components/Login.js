import React, { Component } from 'react';
import { graphql } from 'react-apollo/graphql';
import gql from 'graphql-tag/lib/graphql-tag.umd.js';
//import './Login.scss';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      accessToken: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let win = window.open('https://github.com/login/oauth/authorize?client_id=1759a4054580059ed00e','name', 'width=500,height=600');
    let accessToken = null;
    let intervalID = setInterval(() => {
      if ( win.location.search ) {
        accessToken =  win.location.search.match(/\?access_token=([a-zA-Z0-9]*)/)[1];
        this.setState({ accessToken });
        clearInterval(intervalID);
        win.close();
      }
      
      if ( win.closed ) {
        clearInterval(intervalID);
      }
    }, 1000);
    win.addEventListener('close', () => { console.log('closed window') });
    return;
  }

  componentDidUpdate(prevProps, prevState) {
    const { accessToken } = this.state;
    if ( prevState.accessToken === null && accessToken ) {
      this.props.updateAccessToken(accessToken)
        .then(data => {
          this.setState({ accessToken });
          this.props.history.push('/dashboard');
        })
        .catch(err => {
          console.log('Error while updating cache: ', err);
        });
    }
  }

  render() {
    const { accessToken } = this.state;
    if ( accessToken ) {
      return <div>Redirecting...</div>;
    }
    return (
      <div>
        <button onClick={this.handleClick}>Login with Github</button>
      </div>
    );
  }
}

export default graphql(
  gql`
    mutation updateAccessToken($accessToken: String) {
      updateAccessToken(accessToken: $accessToken) @client
    }
  `,
  {
    props: ({ mutate }) => ({
      updateAccessToken: accessToken => mutate({ variables: { accessToken } })
    })
  }
)(Login);

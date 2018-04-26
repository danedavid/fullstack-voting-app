import React, { Component } from 'react';
import GithubLogin from 'react-github-login';
//import './Login.scss';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      code: null
    };
    this.handleSuccess = this.handleSuccess.bind(this);
  }

  handleSuccess(obj) {
    this.props.history.push('/dashboard', obj);
  }

  handleClick() {
    let win = window.open('https://github.com/login/oauth/authorize?client_id=1759a4054580059ed00e','name', 'width=500,height=600');
    let code = null;
    setInterval(() => {
      if ( win.location.search ) {
        code =  win.location.search.match(/\?code=([a-zA-Z0-9]*)/)[1];
        this.setState({ code });
        win.close();
      }
    }, 1000);
    return;
  }

  render() {
    return (
      <div>
        {
          this.state.code && <div>{this.state.code}</div>
        }
        <GithubLogin
          clientId='1759a4054580059ed00e'
          redirectUri='http://localhost:8000'
          onSuccess={this.handleSuccess}
          onFailure={(err) => console.log('Error Logging in: ', err)}
        />
        <button onClick={this.handleClick.bind(this)}>login</button>
      </div>
    );
  }
}

export default Login;

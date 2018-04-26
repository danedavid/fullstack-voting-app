import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
//import './Login.scss';


class Login extends Component {

  handleClick() {
    this.props.history.push('/dashboard', { clientId: 'hakunamatata' });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>click me to login</button>
      </div>
    );
  }
}

export default Login;

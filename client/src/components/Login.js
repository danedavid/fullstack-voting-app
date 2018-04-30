import React, { Component } from 'react';
//import './Login.scss';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      code: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let win = window.open('https://github.com/login/oauth/authorize?client_id=1759a4054580059ed00e','name', 'width=500,height=600');
    let code = null;
    let intervalID = setInterval(() => {
      console.log('setInterval')
      if ( win.location.search ) {
        code =  win.location.search.match(/\?code=([a-zA-Z0-9]*)/)[1];
        this.setState({ code });
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
    const { code } = this.state;
    if ( prevState.code === null && code ) {
      window.fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        body: {
          client_id: '1759a4054580059ed00e',
          client_secret: 'b02f2a6956ec13d1bf9b5b82be60116c667dfde0',
          code
        },
        headers: {
          'Accept': 'application/json'
        }
      })
        .then(res => {
          console.log(res);
          return res;
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        {
          this.state.code && <div>{this.state.code}</div>
        }
        <button onClick={this.handleClick}>Login with Github</button>
      </div>
    );
  }
}

export default Login;

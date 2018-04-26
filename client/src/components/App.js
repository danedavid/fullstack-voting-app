import React, { Component } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
//import './App.scss';


class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          {/*<Route exact path='/' component={() => <Redirect to='/login'/>}/>*/}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

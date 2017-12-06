import React, { Component } from 'react';
import { Route, Router, Redirect, hashHistory} from 'react-router';
// import PrivateRoute from './components/PrivateRoute';
import AppPage from './components/AppPage';
import LoginPage from './components/LoginPage';
import logo from './logo.svg';
import './App.css';

import Login from './components/LoginView';


const NoMatch = ({ location }) => (
  <div className='ui inverted red raised very padded text container segment'>
    <strong>Error!</strong> No route found matching:
    <div className='ui inverted black segment'>
      <code>{location.pathname}</code>
    </div>
  </div>
);

function requireAuth(nextState, replace, callback) {
  let login = new Login();
  console.warn(`App.requireAuth. user logged in state: ${login.isLoggedIn()}`);
  if (!login.isLoggedIn()) {
    console.log('redirecting... ');
    replace({
      pathname: '/loginPage',
      state: { nextPathname: nextState.location.pathname }
    })
    // return <Redirect to='/loginPage' />
  }
  callback();
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router history={hashHistory}>
          <Route path='/'>
            <Route path='/secure' onEnter={requireAuth} component={AppPage} />
            <Route path='/ok' component={AppPage} />
            <Route path='/loginPage' component={LoginPage} />
            <Route path="/loginBad" render={props => <Login storage={'localstorage'} />} />
            <Route exact path='/foobar' render={() => (
              <Redirect
                to='/albums'
              />
            )} />
            <Route path='/' component={AppPage} />
            <Route component={NoMatch} />
          </Route>

        </Router>
      </div>
    );
  }
}


export default App;

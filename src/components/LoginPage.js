import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import Login from './LoginView';


export default class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render(){ return (
    <div>hello world 
    <Login />
    </div>
    
  )}
}

const LoginPage1 = ({location}) => {
  let login = new Login();
  console.warn('lighting up LoginPage');
  // if (!login.isLoggedIn()){
  //   console.warn('Login Page.. user is NOT logged on');
  //   return <Login storage={'localStorage'} />
  // }

  return <div>Hello again: {location.pathname}</div>
}


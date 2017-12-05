import React from 'react';
// import { Redirect } from 'react-router';
import Login from './LoginView';

const LoginPage = ({location}) => {
  let login = new Login();
  console.warn('lighting up LoginPage');
  if (!login.isLoggedIn()){
    console.warn('Login Page.. user is NOT logged on');
    return <Login storage={'localStorage'} />
  }

  return <div>Hello again: {location.pathname}</div>
}

export default LoginPage
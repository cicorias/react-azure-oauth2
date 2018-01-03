import React, { Component } from 'react';
import { Router } from 'react-router';
// import createReactClass from 'create-react-class';
// import style from './style.scss'; -  <div className={ style.this }>

import { AuthStatus } from '../components/AuthStatus';

const RouteHandler = Router.RouteHandler;

export default class Master extends Component {
    render () {
        return (
          <div>
            <RouteHandler/>
            <hr/>
            <AuthStatus />
          </div>
        );
      }
}

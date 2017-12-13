import React from 'react';
import { Router } from 'react-router';
import createReactClass from 'create-react-class';
import AuthStore from './stores/AuthStore';

const LoginRequired = createReactClass({
  statics: {
    willTransitionTo: function (transition, params, query, callback) {
      if(!AuthStore.loggedIn()){
        // go over to login page
        transition.redirect('/login', null, { redirect: transition.path });
      }
      callback();
    }
  },
  render () {
    return (
      <Router.RouteHandler/>
    );
  }
});

export default {
  LoginRequired
}
// module.exports = { LoginRequired };
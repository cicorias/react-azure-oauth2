const AppDispatcher = require('../dispatcher/AppDispatcher');

/// TODO: what about "completed" or "failed" login events?

function login(user) {
  const action = {
    type: 'auth_login',
    user: user
  };
  
  AppDispatcher.dispatch(action);
}

function logout(user) {
  const action = {
    type: 'auth_logout',
    user: user
  }

  AppDispatcher.dispatch(action);
}

module.exports = {
  login: login,
  logout: logout
};
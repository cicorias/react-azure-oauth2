const AppDispatcher = require('../dispatcher/AppDispatcher');
const EventEmitter = require('events').EventEmitter;
const assign = require('object-assign');
let user = null;

function setUser(user) {
  this.user = user;
}

/* 
 * Notify listeners
 */ 
function emitChange() {
  AuthStore.emit('change');
}

/*
 * Create an object that combines EventEmitter + add/remote/getAuth 
 */
const AuthStore = assign({}, EventEmitter.prototype, {

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getAuth: function () {
    return user;
  }
});


function handleAction(action) {
  switch (action.type) {
    case 'auth_login':
      setUser(action.user);
      emitChange();
      break;

    case 'auth_logout':
      setUser(action.user); /// TODO: perhaps make this null
      emitChange();
      break;
    default:
      break;
  }
}

AuthStore.dispatchToken = AppDispatcher.register(handleAction);

module.exports = AuthStore;
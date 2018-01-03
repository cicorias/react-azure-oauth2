import React, { Component } from 'react';
// import { Router } from 'react-router';
// import createReactClass from 'create-react-class';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthAction';

// mixins: [
//     Router.Navigation,
//     Reflux.connect(AuthStore),
//     Reflux.ListenerMixin

export class AuthStatus extends Component {
    componentWillMount() {
        // TODO: is there a smarter way to do this?
        this.setState(AuthStore.getState());
    }

    componentDidMount() {
        this.listenTo(AuthStore, this.onAuthChange);
    }

    onAuthChange(auth) {
        this.setState(auth);
    }

    handleLogout() {
        AuthActions.logout();
        this.transitionTo('/login');
    }

    render() {
        if (this.state.user) {
            return (
                <section>
                    Hi, {this.state.user.name}!
              <div>
                        <button onClick={this.handleLogout}>Log Out</button>
                    </div>
                </section>
            );
        }
    }
}
// }

// var AuthStatus = createReactClass({
//   mixins: [
//     Router.Navigation
//   ],

//   componentWillMount () {
//     // TODO: is there a smarter way to do this?
//     this.setState(AuthStore.getState());
//   },

//   componentDidMount () {
//     this.listenTo(AuthStore, this.onAuthChange);
//   },

//   onAuthChange(auth) {
//     this.setState(auth);
//   },

//   handleLogout() {
//     AuthActions.logout();
//     this.transitionTo('/login');
//   },

//   render() {
//     if(this.state.user){
//       return (
//         <section>
//           Hi, { this.state.user.name }!
//           <div>
//             <button onClick={ this.handleLogout }>Log Out</button>
//           </div>
//         </section>
//       );
//     }
//   }
// });

// export default {
//     AuthStatus
// }

// // module.exports = AuthStatus;
import React, { Component } from 'react'
import { UserAgentApplication, Logger } from '@cicorias/msal';

const applicationConfig = {
  clientID: process.env.REACT_APP_CLIENTID,
  authority: 'https://login.microsoftonline.com/csenyc.onmicrosoft.com',
  graphScopes: [process.env.REACT_APP_CLIENTID]// ['openid'] // 'profile'
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.user = {};
    this.state = this.user;
    this.authCallback = this.authCallback.bind(this);
    this.loginPopup = this.loginPopup.bind(this);
    this.handleToken = this.handleToken.bind(this);

    this.log = console.log.bind(this);
    this.warn = console.warn.bind(this);
    this.error = console.error.bind(this);
    this.consoleLogger = this.consoleLogger.bind(this);

    this.userAgentApplication = new UserAgentApplication(
      applicationConfig.clientID,
      applicationConfig.authority,
      this.authCallback,
      {
        cacheLocation: 'localStorage',
        postLogoutRedirectUri: '/logout',
        logger: new Logger(this.consoleLogger),
        useV1: true /// TODO externalize
      }
    );

    var user = this.userAgentApplication.getUser();
    this.warn(`the user is: ${JSON.stringify(user)}`)
  }


  authCallback(errorDesc, token, error, tokenType) {
    //This function is called after loginRedirect. msal object is bound to the window object after the constructor is called.
    if (token) {
      console.log('got a token...')
      this.handleToken(token);
    }
    else {
      console.warn(error + ":" + errorDesc);
    }
  }


  loginPopup() {
    var self = this;
    this.userAgentApplication.loginPopup(applicationConfig.graphScopes)
      .then( (idToken) =>{
        //Login Success
        self.log(`idToken from login ${JSON.stringify(idToken)}`);
        self.userAgentApplication.acquireTokenSilent(applicationConfig.graphScopes)
          .then( (accessToken) => {
            //AcquireToken Success
            self.log(`accessToken from aquireSilent ${JSON.stringify(accessToken)}`);
            self.handleToken(accessToken);
          }, (error) => {
            //AcquireToken Failure, send an interactive request.
            self.userAgentApplication.acquireTokenPopup(applicationConfig.graphScopes)
              .then( (accessToken) => {
                self.log(`accessToken from aquirePopup ${JSON.stringify(accessToken)}`);
                self.handleToken(accessToken);
              }, (error) => {
                self.warn(error);
              });
          })
      },  (error) => {
        console.error(error);
      });
  }

  handleToken(token){
    console.log('setting state from handleToken...');
    console.log(`token to handle: ${JSON.stringify(token)}`);
    const user = this.userAgentApplication.getUser();
    console.log(`user handled: ${JSON.stringify(user)}`);
    this.setState( user );
  }

  logout() {
    // Removes all sessions, need to call AAD endpoint to do full logout
    this.userAgentApplication.logout();
  }

  render() {
    return (
      <div>
        <div>This would be a login control...
          <input type='button' title='login' onClick={this.loginPopup} />
        </div>
        <div>
          <span>{this.token}</span>
        </div>
      </div>
    )
  }

  consoleLogger(level, message, containsPii){
    switch (level) {
      case 0:
        console.error(message);
        break;
      case 1:
        console.warn(message);
        break;
      default:
        console.log(message);
        break;
    }
  }

}

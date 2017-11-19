import React, { Component } from 'react'
import { UserAgentApplication } from 'msal';


 // b2c ef36569d-2097-41ec-a3ef-9b066e8d5c29 -
 // aad 45abfc7e-4e11-44ea-8d9a-e0dab00c0e3d -

 //new app.dev
 // fortisdev b354bafa-c381-417e-b93b-fce6e40ee013 +
 // fortis-msal-dev 22b814e7-927d-4bf8-9a8c-55304e9a5acd +

 //fortis-aad-only 001b9e56-2530-4682-9adf-8bbcb077eb67 (microsoft)
var applicationConfig = {
  clientID: process.env.REACT_APP_CLIENTID || '22b814e7-927d-4bf8-9a8c-55304e9a5acd',
  authority1: 'https://login.microsoftonline.com/microsoft.onmicrosoft.com',
  graphScopes: ['profile']

}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: null,
      lastName: null,
      loginName: null,
      isOpen: false
    }

    this.log = console.log;
    this.authCallback = this.authCallback.bind(this);
    // this.userAgentApplication = this.userAgentApplication
    this.loginPopup = this.loginPopup.bind(this);

    this.userAgentApplication = new UserAgentApplication(applicationConfig.clientID, applicationConfig.authority, this.authCallback, {
      cacheLocation: 'localStorage',
      postLogoutRedirectUri: '/logout'
    });
  }


  // get userAgentApplication



  authCallback(errorDesc, token, error, tokenType) {
    //This function is called after loginRedirect. msal object is bound to the window object after the constructor is called.
    if (token) {
      console.log('got a token...')
    }
    else {
      console.warn(error + ":" + errorDesc);
    }
  }


  loginPopup() {
    var self = this;
    this.userAgentApplication.loginPopup(applicationConfig.graphScopes).then(function (idToken) {
      //Login Success
      self.userAgentApplication.acquireTokenSilent(applicationConfig.graphScopes).then(function (accessToken) {
        //AcquireToken Success
        console.log(JSON.stringify(accessToken));
        self.updateUI();
      }, function (error) {
        //AcquireToken Failure, send an interactive request.
        self.userAgentApplication.acquireTokenPopup(applicationConfig.graphScopes).then(function (accessToken) {
          this.updateUI();
        }, function (error) {
          console.warn(error);
        });
      })
    }, function (error) {
      console.error(error);
    });
  }

  logout() {
    // Removes all sessions, need to call AAD endpoint to do full logout
    this.userAgentApplication.logout();
  }

  updateUI() {
    var authButton = document.getElementById('login');
    authButton.innerHTML = 'logout';
    var label = document.getElementById('label');
    label.innerText = "Hello " + this.userAgentApplication.getUser().name + "! Please send an email with Microsoft Graph";

    // Show the email address part
    //var sendEmailSpan = document.getElementById('sendEmail');
    //$("#email").click(sendEmail);
    //sendEmailSpan.className = "visible";
    //var emailAddress = document.getElementById('emailToSendTo');
    //emailAddress["value"] = userAgentApplication.getUser().displayableId;
  }

  render() {
    return (
      <div>This would be a login control...
        <input title='login' onClick={this.loginPopup} />

      </div>

    )
  }
}
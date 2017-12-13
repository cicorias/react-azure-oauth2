// import { Router } from 'react-router';
// import { LoginRequired } from './routeHelpers';

// import Master from './pages/Master';
// import Home from './pages/Home';
// import Login from './pages/Login';

// const React = require('react');
// const Route = Router.Route;
// const DefaultRoute = Router.DefaultRoute;


import React from 'react';
import { Route } from 'react-router';


import Master from './pages/Master';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import LoginRequired from './routeHelper';

// var Route = Router.Route;
/// TODO: deal with default page. DefaultRoute
// var DefaultRoute = Router.DefaultRoute;


export const routes = (
    <Route>
        <Route handler={LoginPage} name="Login" path="Login" />
        <Route handler={LoginRequired}>
            <Route handler={Master}>
                <Route handler={Home} name="Home" path="Home" />
            </Route>
        </Route>
    </Route>
);



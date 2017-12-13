import React from 'react';
import ReactDOM from 'react-dom';
import { routes } from './routes';
import { Router, hashHistory } from 'react-router';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

//let flux = new Fluxxor.Flux(stores, Object.assign({}, DashboardActions, AdminActions, FactsActions));

// const createElement = (Component, props) => {
//     //props.flux = flux;  
//     return <App {...props} />
// };


// ReactDOM.render((<Router history={hashHistory}
//     createElement={createElement}
//     routes={routes} />),
//     document.getElementById('root'));


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
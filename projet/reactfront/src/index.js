import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import './index.css';
import Routes from './routes';
import login from './routes/login';
import register from './routes/register';
import index from './routes/index';
import App from './App';


import * as serviceWorker from './serviceWorker';

/*const App = () => (
    <Routes />
);*/


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

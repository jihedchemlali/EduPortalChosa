import React , { Component } from 'react';
import { HashRouter, Route, Switch , BrowserRouter as Router ,Link , Redirect } from 'react-router-dom';
import './App.css';

import  './assets/front/css/bootstrap.css';
import  './assets/front/css/styles.css';
import login from './routes/login';
import register from './routes/register';
import home from './routes/index';
import parentPanel from './routes/parent/parentPanel';
import parentFooter from './routes/parent/parentFooter';
import parentHeader from './routes/parent/parenthead';
import parentBody from './routes/parent/parentBody';
import parentSidebar from './routes/parent/parentSidebar';
import childCreate from './routes/child/childCreate';
import profil from './routes/parent/parentProfil';
import parentResetPassword from "./routes/parent/parentResetPassword";
import  childactivity from './routes/child/childActivity';
import childcard from './routes/child/childCard.js';
import item from './routes/child/childItem.js';
import actuality from './routes/child/activity/activityBody';
import centrePanel from './routes/centre/CentreBody';
import childCardCenter from './routes/child/childCardCenter';
import reinitPassword from './routes/reinitPassword';
import forgetPassword from './routes/forgetPassword';
import notificationBody from "./routes/Notification/notificationBody";
import searchBody from "./routes/searchResults/searchBody";
import testChild from "./test/testChild";










class App extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path ="/"  exact component = {home}/>
                    <Route exact path ="/register"  exact component = {register}/>
                <Route exact path ="/login"  exact component = {login}/>
                    <Route exact path ="/parentPanel"  exact component = {parentPanel}/>
                    <Route exact path ="/parentHeader"  exact component = {parentHeader}/>
                    <Route exact path ="/parentFooter"  exact component = {parentFooter}/>
                    <Route exact path ="/parentBody"  exact component = {parentBody}/>
                    <Route exact path ="/parentSidebar"  exact component = {parentSidebar}/>
                    <Route exact path ="/createchild"  exact component = {childCreate}/>
                    <Route exact path ="/parent/profil"  exact component = {profil}/>
                    <Route exact path ="/parent/password"  exact component = {parentResetPassword}/>
                    <Route exact path ="/parent/password"  exact component = {parentResetPassword}/>
                    <Route exact path ="/childactivity"  exact component = {childactivity}/>
                    <Route exact path ="/childcard"  exact component = {childcard}/>
                    <Route exact path ="/item"  exact component = {item}/>
                    <Route exact path ="/child/actuality"  exact component = {actuality}/>
                    <Route exact path ="/centrePanel"  exact component = {centrePanel}/>
                    <Route exact path ="/childCardCenter"  exact component = {childCardCenter}/>

                    <Route exact path ="/reset-password"  exact component = {reinitPassword}/>
                    <Route exact path ="/forgetPassword"  exact component = {forgetPassword}/>
                    <Route exact path ="/notifications"  exact component = {notificationBody}/>
                    <Route exact path ="/search"  exact component = {searchBody}/>

                    <Route exact path ="/testChild"  exact component = {testChild}/>










                </Switch>>


            </Router>

        );
    }
}

export default App;
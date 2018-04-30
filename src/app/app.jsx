/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'pages/home/home-page';
import LoginPage from 'pages/login/login-page';
import AdminPage from 'pages/admin/admin-page';
import PrivateRoute from 'core/nav/private-route';
import SignUpPage from 'pages/signup/signup-page';
import RegisterPage from 'pages/register/register-page';
import PasswordResetPage from 'pages/password-reset/password-reset-page';
import PasswordUpdatePage from 'pages/password-update/password-update-page';

import 'app/app.css';
import 'semantic-ui-css/semantic.min.css';

function App() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/password-reset" component={PasswordResetPage} />
            <Route path="/password-update" component={PasswordUpdatePage} />
            <PrivateRoute path="/admin" component={AdminPage} />
            <Redirect to="/" />
        </Switch>
    );
}

export default (module.hot ? hot(module)(App) : App);

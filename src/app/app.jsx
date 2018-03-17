import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'pages/home/home-page';
import LoginPage from 'pages/login/login-page';
import AdminPage from 'pages/admin/admin-page';
import PrivateRoute from 'core/nav/private-route';

function App() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/admin" component={AdminPage} />
            <Redirect to="/" />
        </Switch>
    );
}

export default App;

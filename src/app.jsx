import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'home/home-page';
import LoginPage from 'login/login-page';
import AdminPage from 'admin/admin-page';
import PrivateRoute from 'nav/private-route';

function App() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/admin" component={AdminPage} />
        </Switch>
    );
}

export default App;

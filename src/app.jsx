import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from 'home/home-page';
import LoginPage from 'login/login-page';

function App() {
    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
    );
}

export default App;

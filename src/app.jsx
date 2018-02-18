import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './home/components/pages/home-page';
import LoginPage from './admin/components/pages/login-page';

const App = () => (
    <div>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
    </div>
);

export default App;

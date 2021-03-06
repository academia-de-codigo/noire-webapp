import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as store from 'store';
import App from 'app';

const root = () => (
    <Provider store={store.init()}>
        <Router>
            <App />
        </Router>
    </Provider>
);

export default root;

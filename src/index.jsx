import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './app';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('Running in development mode!');
}

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('app')
);

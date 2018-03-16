/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import App from 'app/app';
import rootReducer from 'reducer';
import * as action from 'auth/auth-actions';
import 'app/app.css';

let reduxMiddleware = applyMiddleware(thunk);

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('Running in development mode!');

    reduxMiddleware = composeWithDevTools(reduxMiddleware);
}

const store = createStore(rootReducer, reduxMiddleware);

if (localStorage.jwt) {
    store.dispatch(action.login(localStorage.jwt));
}

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('app')
);

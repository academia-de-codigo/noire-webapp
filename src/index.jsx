/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import App from 'app';
import rootReducer from 'root-reducer';
import 'app.css';

let reduxMiddleware = applyMiddleware(thunk);

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('Running in development mode!');

    reduxMiddleware = composeWithDevTools(reduxMiddleware);
}

const store = createStore(rootReducer, reduxMiddleware);

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById('app')
);

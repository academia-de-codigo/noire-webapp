/* eslint-disable import/no-extraneous-dependencies */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from 'reducer';
import throttle from 'lodash/throttle';
import * as localStorage from 'local-storage';

export function init() {
    const reduxMiddlewares = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        reduxMiddlewares.push(logger);
    }

    const persistedState = localStorage.loadState();
    const store = createStore(
        rootReducer,
        persistedState,
        composeWithDevTools(applyMiddleware(...reduxMiddlewares))
    );

    store.subscribe(
        throttle(() => {
            localStorage.saveState(store.getState());
        }),
        1000
    );

    return store;
}

import jwtDecode from 'jwt-decode';
import { setAuthorizationHeader } from 'api';
import * as api from './auth-service';
import * as action from './auth-actions';

const internals = {};

internals.setSession = (dispatch, token) => {
    sessionStorage.jwt = token;
    setAuthorizationHeader(token);
    dispatch(action.login(token));
};

internals.clearSession = dispatch => {
    if (internals.intervalID) {
        clearInterval(internals.intervalID);
        delete internals.intervalID;
    }

    sessionStorage.removeItem('jwt');
    setAuthorizationHeader();
    dispatch(action.logout());
};

internals.scheduleRenewal = (dispatch, token) => {
    delete internals.intervalID;
    const delay = jwtDecode(token).exp * 1000 - Date.now() - 10000;

    if (delay > 0) {
        internals.intervalID = setInterval(async () => {
            try {
                const renewedToken = await api.renew();
                internals.setSession(dispatch, renewedToken);
            } catch (error) {
                dispatch(action.logout());
            }
        }, delay);
    }
};

export function login({ username, password }) {
    return async dispatch => {
        const token = await api.login(username, password);
        internals.setSession(dispatch, token);
        internals.scheduleRenewal(dispatch, token);
    };
}

export function logout() {
    return dispatch => {
        api.logout();
        internals.clearSession(dispatch);
    };
}

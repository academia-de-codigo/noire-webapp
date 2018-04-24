import jwtDecode from 'jwt-decode';
import { setAuthorizationHeader } from 'api';
import * as authService from 'auth/auth-service';
import * as action from 'auth/auth-actions';

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

    // request new token when half of the time has expired
    const delay = jwtDecode(token).exp * (1000 / 2);

    if (delay > 0) {
        internals.intervalID = setInterval(async () => {
            try {
                const renewedToken = await authService.renew();
                internals.setSession(dispatch, renewedToken);
            } catch (error) {
                dispatch(action.logout());
            }
        }, delay);
    }
};

export function login({ username, password }) {
    return async dispatch => {
        const token = await authService.login(username, password);
        internals.setSession(dispatch, token);
        internals.scheduleRenewal(dispatch, token);
    };
}

export function logout() {
    return dispatch => {
        authService.logout();
        internals.clearSession(dispatch);
    };
}

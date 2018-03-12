import * as api from './auth-service';
import * as action from './auth-actions';

export function login({ username, password }) {
    return async dispatch => {
        const token = await api.login(username, password);
        dispatch(action.login(token));
    };
}

export function logout() {
    return dispatch => {
        dispatch(action.logout());
    };
}

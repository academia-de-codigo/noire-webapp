import * as types from 'auth/auth-types';

export function login(token) {
    return {
        type: types.LOGIN,
        payload: {
            token
        }
    };
}

export function logout() {
    return {
        type: types.LOGOUT
    };
}

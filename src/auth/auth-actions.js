import * as types from 'auth/auth-types';

export function login(token) {
    return {
        type: types.LOGIN,
        data: {
            token
        }
    };
}

export function logout() {
    return {
        type: types.LOGOUT
    };
}

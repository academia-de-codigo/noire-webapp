import * as types from 'auth/auth-types';

export default function auth(state = {}, { type, data }) {
    switch (type) {
        case types.LOGIN:
            return {
                token: data.token
            };
        case types.LOGOUT:
            return {};
        default:
            return state;
    }
}

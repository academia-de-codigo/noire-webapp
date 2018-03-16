import * as types from './auth-types';

export default function auth(state = {}, { type, payload }) {
    switch (type) {
        case types.LOGIN:
            return {
                token: payload.token
            };
        case types.LOGOUT:
            return {};
        default:
            return state;
    }
}

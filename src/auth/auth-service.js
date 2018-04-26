import * as api from 'api';

export async function login(username, password) {
    const response = await api.post('login', {
        username,
        password
    });

    const token = response.headers['server-authorization'];

    if (!token) {
        throw new Error('authentication failure');
    }

    return token;
}

export function logout() {
    return api.get('logout');
}

export async function renew() {
    const response = await api.get('renew');

    const token = response.headers['server-authorization'];

    if (!token) {
        throw new Error('authentication failure');
    }

    return token;
}

export function signup(email) {
    return api.post('signup', {
        email
    });
}

export function register(token, { name, username, email, password }) {
    return api.post(`register?token=${token}`, {
        name,
        username,
        email,
        password
    });
}

export function passwordReset(email) {
    return api.post('password-reset', {
        email
    });
}

export function passwordUpdate(token, { email, password }) {
    return api.post(`password-update?token=${token}`, {
        email,
        password
    });
}

import axios from 'axios';

// TODO: move into config file
const API = 'https://localhost:8081/api';

export async function login(username, password) {
    // TODO: use timeout config setting
    const response = await axios.post(`${API}/login`, {
        username,
        password
    });

    const token = response.headers['server-authorization'];

    if (!token) {
        throw new Error('authentication failure');
    }

    return token;
}

export async function logout() {
    return axios.post(`${API}/logout`);
}

import Axios from 'axios';

// TODO: move timeout and API into config file
const TIMEOUT = '2000';
const API = 'https://localhost:8081/api';

const axios = Axios.create({
    baseURL: API,
    timeout: TIMEOUT
});

async function wrapError(asyncFunc, ...args) {
    try {
        return await asyncFunc(...args);
    } catch (error) {
        if (error.response) {
            // server responded with status code different 2xx
            throw new Error(error.response.data.message);
        }

        throw error;
    }
}

export async function post(path, data) {
    return wrapError(axios.post, path, data);
}

export async function get(path, data) {
    return wrapError(axios.get, path, data);
}

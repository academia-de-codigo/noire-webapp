import Axios from 'axios';
import { api } from 'config';

const axios = Axios.create({
    baseURL: api.baseURL,
    timeout: api.timeout
});

async function wrapError(asyncFunc, ...args) {
    try {
        return await asyncFunc(...args);
    } catch (error) {
        if (error.response) {
            // server responded with status code different from 2xx
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

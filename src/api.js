import Axios from 'axios';
import config from 'config';

const axios = Axios.create({
    baseURL: config.api.baseURL,
    timeout: config.api.timeout
});

async function wrapError(asyncFunc, ...args) {
    try {
        const response = await asyncFunc(...args);

        // check for server success indication
        if (!response.data.success) {
            throw Error(response.data);
        }

        return response;
    } catch (error) {
        if (error.response && error.response.data.message) {
            // server responded with status code different from 2xx
            throw new Error(error.response.data.message);
        }

        throw new Error('unable to perform network request');
    }
}

export function post(path, data) {
    return wrapError(axios.post, path, data);
}

export function get(path, data) {
    return wrapError(axios.get, path, data);
}

export function setAuthorizationHeader(token) {
    if (token) {
        Axios.defaults.headers.common.authorization = `Bearer ${token}`;
    } else {
        delete Axios.defaults.headers.common.authorization;
    }
}

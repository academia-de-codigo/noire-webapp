const dev = {
    api: {
        baseURL: 'https://localhost:8081/api',
        timeout: 5000
    }
};

const prod = {
    api: {
        baseURL: 'https://localhost:8081/api',
        timeout: 10000
    }
};

export default (() => (process.env.NODE_ENV === 'production' ? prod : dev))();

const dev = {
    api: {
        baseUrl: 'https://localhost:8081/api',
        timeout: 2000
    }
};

const prod = {
    api: {
        baseUrl: 'https://localhost:8081/api',
        timeout: 5000
    }
};

export default (() => (process.env.NODE_ENV === 'production' ? prod : dev))();

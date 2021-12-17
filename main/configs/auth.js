module.exports = {
    service: 'Authorization',
    baseUrl: process.env.AUTH_SERVICE_URL,
    routes: {
        register: {
            method: 'post',
            name: 'User register',
        },
        auth: {
            method: 'head',
            name: 'User authorization',
        },
    },
};
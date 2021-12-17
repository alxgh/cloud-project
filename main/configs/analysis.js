module.exports = {
    service: 'Analysis',
    baseUrl: process.env.ANALYSIS_SERVICE_URL,
    before: {
        service: 'auth',
        route: 'auth',
        headers: true,
    },
    routes: {
        auth: {
            method: 'get',
            name: 'Ana. register',
        },
    },
};
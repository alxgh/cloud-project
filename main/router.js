const axios = require('axios');

const router = (app, configs) => {
    Object.entries(configs).map(([service, config]) => {
        const {baseUrl, service: name, routes} = config;
        Object.entries(routes).map(([route, data]) => {
            const path = `${service}/${route}`;
            console.log(path, data.method, `/api/${path}`)
            app[data.method](`/api/${path}`, async (request, response) => {
                console.log(`Main: Calling ${name} -> ${data.name} -> ${path}`);
                
                
                if (config.before) {
                    beforeService = config.before;
                    console.log(`Main: Calling before ${beforeService.service}:${beforeService.route}`);
                    try {
                        const responseBefore = await axios.request({
                            url:  configs[beforeService.service].baseUrl + `/${beforeService.route}`,
                            method: configs[beforeService.service].routes[beforeService.route].method,
                            headers: {
                                authorization: request.headers.authorization || ''
                            },
                        });
                        console.log(responseBefore);
                    } catch(error) {
                        console.log(error)
                        if(axios.isAxiosError(error)) {
                            if (error.response) {
                                response.status(error.response.status)
                                    .set(error.response.headers)
                                    .send(error.response.data);
                            } else if (error.request) {
                                console.error('error while sending request.');
                                response.status(500).send({
                                    error: 'internal error'
                                });
                            }
                        } else {
                            response.status(500).send({
                                error: 'internal error'
                            });
                        }
                        return;
                    }
                }
                
                try {
                    const serviceResponse = await axios.request({
                        method: data.method,
                        url:  baseUrl + '/' + route,
                        headers: {
                            authorization: request.headers.authorization || ''
                        },
                        data: request.body,
                    });
                    response.status(serviceResponse.status)
                        .set(serviceResponse.headers)
                        .send(serviceResponse.data);
                } catch(error) {
                    console.log(error)
                    if(axios.isAxiosError(error)) {
                        if (error.response) {
                            response.status(error.response.status)
                                .set(error.response.headers)
                                .send(error.response.data);
                        } else if (error.request) {
                            console.error('error while sending request.');
                            response.status(500).send({
                                error: 'internal error'
                            });    
                        }
                    } else {
                        console.error(error);
                        response.status(500).send({
                            error: 'internal error'
                        });
                    }
                }
            });
        });
    });
};

module.exports = router;
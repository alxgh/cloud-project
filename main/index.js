const express = require('express');
const router = require('./router');
require('dotenv').config();

const configs = require('./configs');

const app = express();
const port = process.env.HTTP_PORT || 3000; // @todo: Move to .env file

app.use(express.json()); 
// Logger
// app.use((request, response, next) => {
//     str = JSON. stringify(request.body, null, 4); // (Optional) beautiful indented output.
//     console. log(str); // Logs output to dev tools console.
//     next();
// });

router(app, configs);

app.listen(port, () => {
    console.log('start! ' + port);
});


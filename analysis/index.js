const express = require('express');
const register = require('./routes/register');
const auth = require('./routes/badic_queries');
require('dotenv').config();

const app = express();
const port = process.env.HTTP_PORT || 3000; // @todo: Move to .env file

app.use(express.json());
// Logger
app.use((request, response, next) => {
    str = JSON. stringify(request.body, null, 4); // (Optional) beautiful indented output.
    console. log(str); // Logs output to dev tools console.
    next();
});

app.post('/register', register());
app.head('/auth', auth());
app.listen(port, () => {
    console.log('start!');
});
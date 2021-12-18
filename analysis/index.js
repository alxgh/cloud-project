const express = require('express');
const basic_queries = require('./routes/basic_queries');
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

app.post('/top5platform', basic_queries.getTopFiveOfPlatform());
app.post('/rowByRank', basic_queries.getRowByRank());
app.post('/topNByYear', basic_queries.getTopNByYear());
app.post('/topNByPlatform', basic_queries.getTopNByPlatform());
app.post('/topNByGenre', basic_queries.getTopNByGenre());


app.listen(port, () => {
    console.log('start!');
});
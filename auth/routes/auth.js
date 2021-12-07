const { raw } = require('express');
const _db = require('../db');

const register = (db = _db) => async (request, response) => {
    try {
        const {authorization: headerData} = request.headers;
        const rawData = headerData.replace('Basic ', '');
        console.log(rawData)
        const data = Buffer.from(rawData, 'base64').toString('ascii')

        console.log(data)
        const [username, id] = data.split(':');

        const exists = await db.query('select * from users where id=$1 and username=$2', [id, username]);
        
        console.log(exists.rows)
        if (exists.rows.length > 0) {
            return response.status(200).end();
        }
        return response.status(401).end();
    } catch(err) {
        console.error(err);
        return response.status(500).end();
    }
};

module.exports = register;
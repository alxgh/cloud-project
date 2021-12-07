const _db = require('../db');
const {v4: uuid} = require('uuid');
const register = (db = _db) => async (request, response) => {
    try {
        const {username} = request.body;
        
        const userExists = await db.query('select * from users where username=$1 limit 1', [username]);
        
        if (userExists.rows.length > 0) {
            response.status(400).send({
                error: 'username already exists'
            });
            return;
        }

        const id = uuid();
        await db.query('insert into users (id, username) values ($1, $2)', [id, username])

        response.send({id});
    } catch(err) {
        console.error(err);
        response.statis(500).send({
            error: 'internal error'
        });
    }
};

module.exports = register;
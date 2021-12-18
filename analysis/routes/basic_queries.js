const { raw } = require('express');
const _db = require('../db');

const getTopFiveOfPlatform = (db = _db) => async (request, response) => {
    try {
        const {platform: platform} = request.headers;
        const query_line = 'select * from public.vgsales where "Platform" = $1 ORDER BY "Rank" limit 5';
        const top5 = await db.query(query_line, [platform]);
        response.status(200).send(top5.rows).end();
    } catch (err) {
        console.error(err);
        return response.status(500).end();
    }
}

const getRowByRank = (db = _db) => async (request, response) => {
    try {
        const {rank: rank} = request.headers;
        const query_line = 'select * from public.vgsales where "Rank" = $1';
        const rows = await db.query(query_line, [rank]);
        response.status(200).send(rows.rows[0]).end();
    }
    catch (err){
        console.error(err);
        return response.status(500).end();
    }
}

const getTopNByYear = (db = _db) => async (request, response) => {

    try {
        const {n: n} = request.headers;
        const {year: year} = request.headers;
        const query_line = 'select * from public.vgsales where "Year" = $1 ORDER BY "Rank" limit $2';
        const rows = await db.query(query_line, [year, n]);
        response.status(200).send(rows.rows).end();
    }
    catch (err){
        console.error(err);
        return response.status(500).end();
    }

}

const getTopNByPlatform = (db = _db) => async (request, response) => {

    try {
        const {n: n} = request.headers;
        const {platform: platform} = request.headers;
        const query_line = 'select * from public.vgsales where "Platform" = $1 ORDER BY "Rank" limit $2';
        const rows = await db.query(query_line, [platform, n]);
        response.status(200).send(rows.rows).end();
    }
    catch (err){
        console.error(err);
        return response.status(500).end();
    }

}

const getTopNByGenre = (db = _db) => async (request, response) => {

    try {
        const {n: n} = request.headers;
        const {genre: genre} = request.headers;
        const query_line = 'select * from public.vgsales where "Genre" = $1 ORDER BY "Rank" limit $2';
        const rows = await db.query(query_line, [genre, n]);
        response.status(200).send(rows.rows).end();
    }
    catch (err){
        console.error(err);
        return response.status(500).send("We ate Pressure dude.").end();
    }

}

const getRowsByName = (db = _db) => async (request, response) => {

    try {
        // const {rank: rank} = request.headers;
        // const query_line = 'select * from public.vgsales where "Rank" = $1';
        // const rows = await db.query(query_line, [rank]);
        // response.status(200).send(rows.rows[0]).end();
    }
    catch (err){
        console.error(err);
        return response.status(500).end();
    }

}

const getEUMoreThanNA = (db = _db) => async (request, response) => {

    try {

    }
    catch (err){
        console.error(err);
        return response.status(500).end();
    }

}

// const register = (db = _db) => async (request, response) => {
//     try {
//         const {authorization: headerData} = request.headers;
//         const rawData = headerData.replace('Basic ', '');
//         console.log(rawData)
//         const data = Buffer.from(rawData, 'base64').toString('ascii')
//
//         console.log(data)
//         const [username, id] = data.split(':');
//
//         const exists = await db.query('select * from users where id=$1 and username=$2', [id, username]);
//
//         console.log(exists.rows)
//         if (exists.rows.length > 0) {
//             return response.status(200).end();
//         }
//         return response.status(401).end();
//     } catch(err) {
//         console.error(err);
//         return response.status(500).end();
//     }
// };

module.exports = {getTopFiveOfPlatform, getRowByRank, getTopNByYear, getTopNByPlatform, getTopNByGenre};
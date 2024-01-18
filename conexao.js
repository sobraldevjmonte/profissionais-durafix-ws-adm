const { Pool } = require('pg');
/*const client = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'profdurafix',
    password: 'postgres',
    port: 5432,
});*/

const pool = new Pool({
    "connectionLimit": 10000,
    "host": process.env.POSTGRES_HOST,
    "user": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DATABASE,
    "port": process.env.POSTGRES_PORT
});

exports.execute = (query, params = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    })
}

exports.pool = pool;
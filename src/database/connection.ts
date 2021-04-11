import knex from 'knex'
require('dotenv').config();

const db = knex({
    client: 'mysql',
    connection: {
        host: process.env.HOST_DB,
        port: 3306,
        database: process.env.DATABASE,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,

    },
    useNullAsDefault: true,
});

export default db;
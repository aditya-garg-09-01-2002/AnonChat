// config/database.js
require('dotenv').config();

const dbConfig = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
};

module.exports = dbConfig;

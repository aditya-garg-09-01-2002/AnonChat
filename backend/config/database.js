// config/database.js
require('dotenv').config();

const dbConfig = {
    connectionLimit:process.env.MYSQL_ADDON_LIMTI,
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    port:process.env.MYSQL_ADDON_PORT,
};

module.exports = dbConfig;

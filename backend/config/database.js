// config/database.js
require('dotenv').config();

const dbConfig = {
    host: process.env.host || 'localhost',
    user: process.env.user || 'root',
    password: process.env.password || '',
    database: process.env.database || 'mydatabase',
};

module.exports = dbConfig;

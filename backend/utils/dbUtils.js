// utils/dbUtils.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

const pool = mysql.createPool(dbConfig);

exports.query = async (sql, values) => {
    const connection = await pool.getConnection();
    try {
        const [results] = await connection.query(sql, values);
        return results;
    } finally {
        connection.release();
    }
};

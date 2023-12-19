// utils/dbUtils.js
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

const pool = mysql.createPool(dbConfig);

exports.query = async (sql, values) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query(sql, values);
        return results;
    }
    catch(error)
    {
        throw new Error(error.message)
    } 
    finally {
        connection.release();
    }
};

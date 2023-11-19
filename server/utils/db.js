const { Pool } = require('pg');
require('dotenv').config();
const connectionString = process.env.DB_URL;

const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;

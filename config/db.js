const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL
const pool = postgres(connectionString)

module.exports = pool
// // backend/config/db.js
// const { Pool } = require('pg'); // Use pg for PostgreSQL
// const dotenv = require('dotenv');

// dotenv.config();

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME, // Use the DB_NAME environment variable
//     port: 5432, // Default PostgreSQL port; change if necessary
// });

// pool.connect(err => {
//     if (err) throw err;
//     console.log('Connected to the database.');
// });

// module.exports = pool;
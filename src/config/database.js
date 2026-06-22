require('dotenv').config();
const mysql = require('mysql2/promise');

// const connection = mysql.createConnection({
//   host: process.env.BD_HOST,
//   port: process.env.BD_PORT,
//   user: process.env.BD_USER,
//   password: process.env.BD_PASSWORD,
//   database: process.env.BD_NAME
// });

const connection = mysql.createPool({
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = connection;
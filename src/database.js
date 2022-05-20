const mysql = require("mysql");
const { promisify } = require("util");
const dotenv = require("dotenv");

var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has to many connections");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused");
    }
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error(
        "Connection to the database has been denied. Credentials do not match"
      );
    }
    if (err.code === "ETIMEDOUT") {
      console.error("Could not connect to the database server");
    }
    if (err.code === "ER_BAD_DB_ERROR") {
      console.error("Unknown database");
    }
  }

  if (connection) {
    connection.release();
    console.log("DB is Connected");
  }

  return;
});

pool.query = promisify(pool.query);

module.exports = pool;

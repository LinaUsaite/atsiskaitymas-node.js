const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
  host: process.env.DB_HOST, // Postgres ip address[s] or domain name[s]
  port: process.env.DB_PORT, // Postgres server port[s]
  database: process.env.DB_NAME, // Name of database to connect to
  username: process.env.DB_USER, // Username of database user
  password: process.env.DB_PASS, // Password of database user
});

const testConnection = async () => {
  try {
    await sql`select 1 as result`;
    console.log("Connection to database successful");
  } catch (error) {
    console.log("Connection to database failed", error);
    throw error;
  }
};

module.exports = { sql, testConnection };

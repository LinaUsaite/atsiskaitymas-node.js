const postgres = require("postgres");
require("dotenv").config();

const sql = postgres({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, 
  database: process.env.DB_NAME, 
  username: process.env.DB_USER, 
  password: process.env.DB_PASS, 
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

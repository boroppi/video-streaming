const dotenv = require("dotenv");
dotenv.config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.PSQL_USER,
  password: process.env.PSQL_PASSWD,
  host: process.env.PSQL_HOST,
  port: process.env.PSQL_PORT,
  database: process.env.PSQL_DATABASE
});

module.exports = pool;

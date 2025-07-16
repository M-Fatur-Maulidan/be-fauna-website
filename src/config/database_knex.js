const env = process.env;

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    timezone: "+07:00",
  },
  pool: { min: 0, max: 100 },
});

module.exports = knex;

require("dotenv").config();

const shared = {
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || "cvgca",
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 3306,
  dialect: "mysql",
};

module.exports = {
  development: shared,
  test: { ...shared, database: process.env.DB_NAME_TEST || "cvgca_test" },
  production: shared,
};

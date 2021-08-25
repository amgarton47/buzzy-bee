const Sequelize = require("sequelize");
const chalk = require("chalk");

const dbName =
  process.env.DATABASE_URL || "postgres://localhost:5432/buzzy-bee";

console.log(chalk.yellow(`Opening database connection to ${dbName}`));

const db = new Sequelize(dbName, {
  // logging: false,
});

module.exports = db;

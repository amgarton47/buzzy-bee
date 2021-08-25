const { Sequelize } = require("../db");
const db = require("../db");

const GameEntry = db.define("game-entry", {
  foundWords: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
  duration: { type: Sequelize.INTEGER, defaultValue: 0 },
  pangramsFound: { type: Sequelize.ARRAY(Sequelize.STRING), defaultValue: [] },
  entriesAttempted: { type: Sequelize.INTEGER, defaultValue: 0 },
});

module.exports = GameEntry;

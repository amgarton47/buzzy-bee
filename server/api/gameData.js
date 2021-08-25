const axios = require("axios");

const gameData = require("express").Router();
const GameEntry = require("../db/models/GameEntry");

// path: /api/gameData/
gameData.get("/:date", async (req, res, next) => {
  const date = req.params.date;
  GameEntry.findByPk(date)
    .then(async (entry) => {
      if (entry) {
        res.send(entry);
      } else {
        await axios
          .get(`https://nyt-spelling-bee-db.herokuapp.com/${date}`)
          .then(async ({ data }) => {
            if (data.printDate) {
              const newGame = await GameEntry.create({ date });
              res.send(newGame);
            } else {
              res.send(
                "Cannot create game data for future dates, or those before 08-10-2018"
              );
            }
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => console.log(err));
});

gameData.put("/:date", async (req, res, next) => {
  const date = req.params.date;
  GameEntry.findByPk(date)
    .then(async (entry) => {
      if (entry) {
        if (req.body.newWord) {
          entry.foundWords = [...entry.foundWords, req.body.newWord];
        }
        if (req.body.foundWords) entry.foundWords = req.body.foundWords;
        if (req.body.entriesAttempted)
          entry.entriesAttempted = req.body.entriesAttempted;

        await entry.save();
      } else {
        res.send("game data does not exist for this day");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = gameData;

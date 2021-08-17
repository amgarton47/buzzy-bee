const beeData = require("express").Router();

const cheerio = require("cheerio");
const requestPromise = require("request-promise");

const url = "https://www.nytimes.com/puzzles/spelling-bee";

beeData.get("/today", async (req, res, next) => {
  requestPromise(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const letterList = $("div .pz-game-screen");
      const elem = $(letterList).find("script");

      const beeData = JSON.parse(
        $(elem).contents().text().replace("window.gameData = ", "")
      );

      console.log(beeData);

      res.send(beeData.today);
    })
    .catch((err) => console.log(err));
});

beeData.get("/yesterday", async (req, res, next) => {
  requestPromise(url)
    .then((html) => {
      const $ = cheerio.load(html);
      const letterList = $("div .pz-game-screen");
      const elem = $(letterList).find("script");

      const beeData = JSON.parse(
        $(elem).contents().text().replace("window.gameData = ", "")
      );

      res.send(beeData.yesterday);
    })
    .catch((err) => console.log(err));
});

module.exports = beeData;

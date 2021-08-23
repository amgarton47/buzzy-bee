const beeData = require("express").Router();

const redis = require("redis");
const redisPort = 6379;
const client = redis.createClient(redisPort);

const cheerio = require("cheerio");
const requestPromise = require("request-promise");
const { default: axios } = require("axios");

const url = "https://www.nytimes.com/puzzles/spelling-bee";

client.on("error", (err) => {
  console.log(err);
});

beeData.get("/today", (req, res, next) => {
  try {
    client.get("todaysData", async (err, todaysData) => {
      if (err) throw err;

      if (todaysData) {
        res.send(JSON.parse(todaysData).today);
      } else {
        requestPromise(url)
          .then((html) => {
            const $ = cheerio.load(html);
            const letterList = $("div .pz-game-screen");
            const elem = $(letterList).find("script");

            const beeData = JSON.parse(
              $(elem).contents().text().replace("window.gameData = ", "")
            );

            client.setex("todaysData", 600, JSON.stringify(beeData));

            res.send(beeData.today);
          })
          .catch((err) => console.log(err));
      }
    });
  } catch (err) {}
});

beeData.get("/yesterday", (req, res, next) => {
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

beeData.get("/:date", (req, res, next) => {
  axios
    .get(`https://nyt-spelling-bee-db.herokuapp.com/${req.params.date}`)
    .then(({ data }) => res.send(data))
    .catch((err) => console.log(err));
  // requestPromise(url)
  //   .then((html) => {
  //     const $ = cheerio.load(html);
  //     const letterList = $("div .pz-game-screen");
  //     const elem = $(letterList).find("script");

  //     const beeData = JSON.parse(
  //       $(elem).contents().text().replace("window.gameData = ", "")
  //     );

  //     res.send(beeData.yesterday);
  //   })
  //   .catch((err) => console.log(err));
});

module.exports = beeData;

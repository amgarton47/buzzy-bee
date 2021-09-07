const beeData = require("express").Router();

const redis = require("redis");
const redisPort = 6379;
const client = redis.createClient(redisPort);

const cheerio = require("cheerio");
const requestPromise = require("request-promise");
const axios = require("axios");
const { next } = require("cheerio/lib/api/traversing");

const url = "https://www.nytimes.com/puzzles/spelling-bee";

client.on("error", (err) => {
  console.log(err);
});

const getAllPuzzles = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit); // Make sure to parse the limit to number
    const skip = parseInt(req.query.skip); // Make sure to parse the skip to number

    // We are using the '3 layer' architecture explored on the 'bulletproof node.js architecture'
    // Basically, it's just a class where we have our business logic
    const puzzles = await axios.get().getAll(limit, skip);

    return res.status(200).json(users);
  } catch (e) {
    next(e);
    return res.status(500).json(e);
  }
};

beeData.get("/", async (req, res, next) => {
  const limit = parseInt(req.params.limit);
  console.log(req.query.limit);
  const puzzles = await axios.get(
    `https://nyt-spelling-bee-db.herokuapp.com/all`
  );
  // .sort(function (a, b) {
  //   var dateA = new Date(a.date),
  //     dateB = new Date(b.date);
  //   return dateA - dateB;
  // });
  res.send(puzzles.splice(0, limit));
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

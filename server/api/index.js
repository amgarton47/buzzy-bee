const api = require("express").Router();

api.use("/beeData", require("./beeData"));
api.use("/gameData", require("./gameData"));

api.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = api;

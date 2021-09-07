const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");
const morgan = require("morgan");

const chalk = require("chalk");
const { db } = require("./db");
const bodyParser = require("body-parser");

app.use(bodyParser());

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}); // Send index.html for any other requests

const init = async () => {
  try {
    app.listen(PORT, async () => console.log(`Listening on port ${PORT}`));
    await db.sync(/*{ force: true }*/);
  } catch (err) {
    console.log(err);
  }
};

init();

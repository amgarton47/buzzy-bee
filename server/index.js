const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

const chalk = require("chalk");
const { db } = require("./db");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// var allowCrossDomain = function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// };

// app.use(allowCrossDomain);
// app.use(cors());
// app.use(bodyParser());

const bodyParser = require("body-parser");
app.use(bodyParser());

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

const express = require("express");
const app = express();
const PORT = 8080;
const path = require("path");

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}); // Send index.html for any other requests

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

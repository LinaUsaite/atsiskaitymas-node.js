const express = require("express");

const app = express();
const port = 3001;

app.get("/", (req, res) => {
  res.send("Serveris veikia 🚀");
});

app.listen(port, () => {
  console.log(`Serveris paleistas ant port ${port}`);
});
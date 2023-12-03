const express = require("express");
const app = express();
const cors = require('cors');

const port = process.env.PORT || 3001;

var corsOptions = {
  origin: ['http://localhost:5173', 'https://tv-roulette.onrender.com'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

app.get("/api", (req, res) => {
  res.json({ "shows": ["The Sopranos", "Mad Men", "Friends"]})
})

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
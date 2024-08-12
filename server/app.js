const express = require("express");
const app = express();

const tvRoute = require('./routes/tv');

const port = process.env.PORT || 3001;

app.use("/api/tv", tvRoute)

app.use("/", express.static("client/dist"));

const server = app.listen(port, async () => {
  console.log(`App listening on port ${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

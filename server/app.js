const express = require("express");
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3001;

const TVDBApiKey = process.env.API_KEY;
const TVDBUrl = 'https://api4.thetvdb.com/v4/';


app.get("/api", (req, res) => {
  res.json({ "shows": [{"name": "The Sopranos", "tvdb_id": 75299}, {"name": "Mad Men", "tvdb_id": 80337}, {"name": "Friends", "tvdb_id": 79168}] })
})

let bearerToken = null;

const getBearerToken = async () => {
  let response = await fetch(`${TVDBUrl}login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "apikey": TVDBApiKey, "pin": null })
  })
  let { status, data } = await response.json()
  let { token } = data;

  bearerToken = token;
}

app.get("/api", (req, res) => {
  res.json({ "shows": [{"name": "The Sopranos", "tvdb_id": 75299}, {"name": "Mad Men", "tvdb_id": 80337}, {"name": "Friends", "tvdb_id": 79168}] })
})

app.get("/api/search", async (req, res) => {
  let show = req.query.show;
  let response = await fetch(`${TVDBUrl}search?query=${show}&type=series&limit=5`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearerToken}`,
    },
  })
  let { status, data } = await response.json()
  res.json({ "shows": data })
})

const getExtendedSeriesData = async (showId) => {
  let response = await fetch(`${TVDBUrl}series/${showId}/extended?meta=translations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearerToken}`,
    },
  })
  let { status, data } = await response.json()
  return { status, data }
}

const getDefaultSeasons = async (showId) => {
  let { status, data } = await getExtendedSeriesData(showId);
  let { defaultSeasonType, seasons } = data;
  let defaultSeasons = seasons.filter(season => season.type.id === defaultSeasonType).filter(season => season.number > 0);

  return defaultSeasons;
}

app.get("/api/select", async (req, res) => {
  let showId = req.query.id;
  
  let defaultSeasons = await getDefaultSeasons(showId);
  
  let numSeasons = defaultSeasons.length;
  let seasonIndex = Math.floor(Math.random() * numSeasons);

  let seasonId = defaultSeasons[seasonIndex].id;

  let response = await fetch(`${TVDBUrl}seasons/${seasonId}/extended`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${bearerToken}`,
    },
  });
  let { status, data } = await response.json()

  let { episodes } = data;
  let numEpisodes = episodes.length;
  let episodeIndex = Math.floor(Math.random() * numEpisodes)
  res.json({ "seasonNumber": seasonIndex + 1, "episodeNumber": episodeIndex + 1, "data": episodes[episodeIndex] })
})

app.use('/', express.static('client/dist'))

const server = app.listen(port, async () => {
  console.log(`Example app listening on port ${port}!`)

  if (!bearerToken) await getBearerToken();
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
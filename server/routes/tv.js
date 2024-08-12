const express = require("express");
const router = express.Router();

const { TVDBUrl, checkBearerToken } = require('../middleware/tvdb');

router.get("/", (req, res) => {
  res.json({
    shows: [
      { name: "The Sopranos", tvdb_id: 75299 },
      { name: "Mad Men", tvdb_id: 80337 },
      { name: "Friends", tvdb_id: 79168 },
    ],
  });
});

router.use(checkBearerToken);

router.get("/search",  async (req, res) => {
  let show = req.query.show;
  let response = await fetch(
    `${TVDBUrl}/search?query=${show}&type=series&limit=5`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${res.locals.bearerToken}`,
      },
    }
  );
  let { status, data } = await response.json();
  res.json({ shows: data });
});

const getDefaultSeasons = async (showId, bearerToken) => {
  let response = await fetch(
    `${TVDBUrl}/series/${showId}/extended?meta=translations`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
    }
  );
  let { status, data } = await response.json();
  let { defaultSeasonType, seasons } = data;
  let defaultSeasons = seasons
    .filter((season) => season.type.id === defaultSeasonType)
    .filter((season) => season.number > 0);

  return defaultSeasons;
};

const getSeasonEpisodes = async (seasonId, bearerToken) => {
  let response = await fetch(`${TVDBUrl}/seasons/${seasonId}/extended`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  });
  let { status, data } = await response.json();
  let { episodes } = data;
  return episodes;
};

router.get("/select", async (req, res) => {
  let showId = req.query.id;

  let defaultSeasons = await getDefaultSeasons(showId, res.locals.bearerToken);

  let numSeasons = defaultSeasons.length;
  let seasonIndex = Math.floor(Math.random() * numSeasons);

  let seasonId = defaultSeasons[seasonIndex].id;

  const episodes = await getSeasonEpisodes(seasonId, res.locals.bearerToken);

  let numEpisodes = episodes.length;
  let episodeIndex = Math.floor(Math.random() * numEpisodes);

  res.json({
    seasonNumber: seasonIndex + 1,
    episodeNumber: episodeIndex + 1,
    data: episodes[episodeIndex],
  });
});

module.exports = router;
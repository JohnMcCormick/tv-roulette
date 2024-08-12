require("dotenv").config();

const TVDBApiKey = process.env.API_KEY;
const TVDBUrl = "https://api4.thetvdb.com/v4";

let bearerToken = null;
let tokenExpiryDate = new Date();

const getBearerToken = async () => {
  let response = await fetch(`${TVDBUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apikey: TVDBApiKey }),
  });
  let { status, data } = await response.json();
  let { token } = data;

  console.log(`Got bearer token: ${new Date()}\n${token}`);

  return token
};

const checkBearerToken = async (req, res, next) => {
  let currentDate = new Date();
  if (currentDate - tokenExpiryDate >= 0) {
    bearerToken = await getBearerToken();
    tokenExpiryDate = new Date().setDate(new Date().getDate() + 28);
  }
  res.locals.bearerToken = bearerToken;
  next();
};

module.exports = { TVDBUrl, checkBearerToken };

const { v4: uuidv4 } = require('uuid');
const {generateShortId} = require("../utils/shortCodeGenerator")
const urlDatabase = {};



const encodeUrl =(longUrl)=> {
  const shortCode = generateShortId();
  const shortUrl = `http://short.est/${shortCode}`;

  urlDatabase[shortCode] = {
    longUrl,
    shortUrl,
    createdAt: new Date(),
    visits: 0,
  };

  return urlDatabase[shortCode];
}

const decodeUrl = (shortCode) =>{
  return urlDatabase[shortCode] || null;
}

const getStats = (shortCode) => {
  const data = urlDatabase[shortCode];
  return data
    ? {
        longUrl: data.longUrl,
        shortUrl: data.shortUrl,
        createdAt: data.createdAt,
        visits: data.visits,
      }
    : null;
}

const listAllUrls = () =>{
  return Object.entries(urlDatabase).map(([code, data]) => ({
    shortCode: code,
    ...data,
  }));
}

const incrementVisits = (shortCode)=> {
  if (urlDatabase[shortCode]) {
    urlDatabase[shortCode].visits += 1;
  }
}

const searchUrls = (query) => {
  return Object.entries(urlDatabase)
    .filter(([_, data]) => data.longUrl.includes(query))
    .map(([code, data]) => ({
      shortCode: code,
      ...data,
    }));
}

module.exports = {
  encodeUrl,
  decodeUrl,
  getStats,
  listAllUrls,
  incrementVisits,
  searchUrls,
};

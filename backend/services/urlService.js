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





module.exports = {
  encodeUrl,
  decodeUrl,
};

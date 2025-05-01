const {
    encodeUrl,
    decodeUrl,
 
  } = require('../services/urlService');
  
  exports.encode = (req, res) => {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ error: 'longUrl is required' });
  
    const result = encodeUrl(longUrl);
    res.status(201).json(result);
  };
  
  exports.decode = (req, res) => {
    const { shortUrl } = req.body;
    const shortCode = shortUrl?.split('/').pop();
    const result = decodeUrl(shortCode);
    if (!result) return res.status(404).json({ error: 'Short URL not found' });
  
    res.status(201).json({ longUrl: result.longUrl });
  };
  

  
  
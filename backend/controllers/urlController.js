const {
    encodeUrl,
    decodeUrl,
    getStats,
    listAllUrls,
    incrementVisits,
    searchUrls,
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
  
    res.json({ longUrl: result.longUrl });
  };
  
  exports.statistic = (req, res) => {
    const { url_path } = req.params;
    const stats = getStats(url_path);
    if (!stats) return res.status(404).json({ error: 'URL not found' });
  
    res.json(stats);
  };
  
  exports.list = (req, res) => {
    const { search } = req.query;
    const result = search && search.length >= 3 ? searchUrls(search) : listAllUrls();
    res.json(result);
  };
  
  exports.redirectToLongUrl = (req, res) => {
    const { url_path } = req.params;
    const data = decodeUrl(url_path);
    if (!data) return res.status(404).send('URL not found');
    incrementVisits(url_path);
    res.redirect(data.longUrl);
  };
  
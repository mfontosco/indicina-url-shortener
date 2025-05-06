const logger = require('../logger');
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
  logger.info(`Encoding URL: ${longUrl}`);

  if (!longUrl) {
    logger.warn('Missing longUrl in request body');
    return res.status(400).json({ error: 'longUrl is required' });
  }

  const result = encodeUrl(longUrl);
  logger.info(`Generated short URL: ${result.shortUrl}`);
  res.status(201).json(result);
};

exports.decode = (req, res) => {
  const { shortUrl } = req.body;
  const shortCode = shortUrl?.split('/').pop();
  logger.info(`Decoding short URL: ${shortUrl}`);

  const result = decodeUrl(shortCode);
  if (!result) {
    logger.warn(`Short URL not found: ${shortUrl}`);
    return res.status(404).json({ error: 'Short URL not found' });
  }

  logger.info(`Decoded to long URL: ${result.longUrl}`);
  res.json({ longUrl: result.longUrl });
};

exports.statistic = (req, res) => {
  const { url_path } = req.params;
  logger.info(`Fetching stats for: ${url_path}`);

  const stats = getStats(url_path);
  if (!stats) {
    logger.warn(`Stats not found for: ${url_path}`);
    return res.status(404).json({ error: 'URL not found' });
  }

  res.json(stats);
};

exports.list = (req, res) => {
  const { search } = req.query;
  logger.info(search && search.length >= 3
    ? `Searching URLs with query: ${search}`
    : 'Listing all URLs');

  const result = search && search.length >= 3 ? searchUrls(search) : listAllUrls();
  res.json(result);
};

exports.redirectToLongUrl = (req, res) => {
  const { url_path } = req.params;
  logger.info(`Redirect requested for: ${url_path}`);

  const data = decodeUrl(url_path);
  if (!data) {
    logger.warn(`Redirect failed, short URL not found: ${url_path}`);
    return res.status(404).send('URL not found');
  }

  incrementVisits(url_path);
  logger.info(`Redirecting to: ${data.longUrl}`);
  res.redirect(data.longUrl);
};

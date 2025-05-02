const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');

router.post('/encode', controller.encode);
router.post('/decode', controller.decode);
router.get('/statistic/:url_path', controller.statistic);
router.get('/list', controller.list);

module.exports = router;

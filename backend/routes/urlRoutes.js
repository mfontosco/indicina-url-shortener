const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');

router.post('/encode', controller.encode);
router.post('/decode', controller.decode);


module.exports = router;

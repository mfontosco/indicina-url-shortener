const express = require('express');
const cors = require("cors")
const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());
app.use(cors('*'))
app.use('/api', urlRoutes);
app.get('/:url_path', require('./controllers/urlController').redirectToLongUrl);

module.exports = app;

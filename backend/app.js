const express = require('express');
const urlRoutes = require('./routes/urlRoutes');

const app = express();
app.use(express.json());

app.use('/api', urlRoutes);
app.get('/:url_path', require('./controllers/urlController').redirectToLongUrl);

module.exports = app;

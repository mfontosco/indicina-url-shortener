const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const urlRoutes = require('./routes/urlRoutes');
const { redirectToLongUrl } = require('./controllers/urlController');
const logger = require('./logger');

const app = express();
app.use(express.json());


app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);


app.use('/api', urlRoutes);
app.get('/:url_path', redirectToLongUrl);


app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello, world!' });
});

app.use(express.json());

app.use(express.static(__dirname + '/uploads'));

app.use('/uploads', express.static('uploads'));

app.use(
  cors({
    origin: '*'
  })
);

app.use(routes);

module.exports = app;

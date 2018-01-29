const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const api = require('./api/api');

mongoose.connect('mongodb://localhost/mevn');
let db = mongoose.connection;

db.once('open', () => {
  console.log("Connected to MongoDB");
});

db.on('error', (err) => {
  console.log(err);
});
mongoose.Promise = global.Promise;

app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/', api);

module.exports = app;
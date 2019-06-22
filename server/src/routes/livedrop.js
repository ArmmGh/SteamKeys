const db = require('../utils/db');
const passport = require('passport');
const livedrop = require('express').Router();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;
const url =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `http://${host}/`;

require('dotenv').config();

livedrop.get('/live', (req, res) => {
  db.getLivedrop().then(data => res.send(data.reverse().slice(0, 10)));
});

module.exports = livedrop;

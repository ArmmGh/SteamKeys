const db = require('../utils/db');
const passport = require('passport');
const games = require('express').Router();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;
const url =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `http://${host}/`;

require('dotenv').config();

games.get('/games', (req, res) => {
  db.getGames().then(response => res.send(response));
});

module.exports = games;

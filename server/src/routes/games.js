const db = require('../utils/db');
const passport = require('passport');
const games = require('express').Router();

require('dotenv').config();

games.get('/games', (req, res) => {
  db.getGames().then(response => res.send(response));
});

module.exports = games;

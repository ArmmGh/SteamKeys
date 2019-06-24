const db = require('../utils/db');
const passport = require('passport');
const livedrop = require('express').Router();

require('dotenv').config();

livedrop.get('/live', (req, res) => {
  db.getLivedrop().then(data => res.send(data.reverse().slice(0, 10)));
});

module.exports = livedrop;

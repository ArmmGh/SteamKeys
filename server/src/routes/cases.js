const db = require('../utils/db');
const passport = require('passport');
const cases = require('express').Router();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;
const url =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `http://${host}/`;

require('dotenv').config();

cases.post('/cases/:name', (req, res) => {
  db.getCase(req.params.name).then(response => res.send(response));
});

module.exports = cases;

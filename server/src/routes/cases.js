const db = require('../utils/db');
const passport = require('passport');
const cases = require('express').Router();

require('dotenv').config();

cases.post('/cases/:name', (req, res) => {
  db.getCase(req.params.name).then(response => res.send(response));
});

module.exports = cases;

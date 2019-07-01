const db = require('../utils/db');
const passport = require('passport');
const cases = require('express').Router();

require('dotenv').config();

cases.post('/cases/:name', (req, res) => {
  db.getCase(req.params.name).then(response => res.send(response));
});

cases.post('/opencase', (req, res) => {
  db.updateBalance(
    { steamid: req.session.passport.user.id },
    {
      type: 'balance',
      price: req.body.case.priceRUB,
    },
  ).then(data => {
    res.send({ ...data });
  });
});

module.exports = cases;

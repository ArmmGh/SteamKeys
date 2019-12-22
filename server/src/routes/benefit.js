const db = require('../utils/db');
const benefit = require('express').Router();

require('dotenv').config();

benefit.get('/benefitlive', (req, res) => {
  db.getBenefit().then(data => res.send(data.reverse().slice(0, 20)));
});

benefit.get('/benefitliveinfo', (req, res) => {
  db.getLiveinfo().then(data => res.send({ users: data[0], cases: data[1] }));
});

module.exports = benefit;
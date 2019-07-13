const db = require('../utils/db');
const userbalance = require('express').Router();

require('dotenv').config();

userbalance.post('/addbalance', (req, res) => {
  console.log(req.body);
});

module.exports = userbalance;

const db = require('../utils/db');
const userbalance = require('express').Router();
const http = require('https');

require('dotenv').config();

userbalance.post('/addbalance', (req, res) => {
  const data = {
    shop: 4285,
    payment: 110857,
    amount: req.body.sum,
    description: 'Оплата товара',
    currency: 3,
    via: 'qiwi',
  };
  // https.post('https://primepayer.com/pay');
});

module.exports = userbalance;

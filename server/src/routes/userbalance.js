const db = require('../utils/db');
const userbalance = require('express').Router();
const http = require('https');

require('dotenv').config();

const options = {
  hostname: 'https://primepayer.com',
  port: 443,
  path: '/pay',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

userbalance.post('/addbalance', (req, res) => {
  const data = {
    shop: 4285,
    payment: 110857,
    amount: req.body,
    description: 'Оплата товара',
    currency: 3,
    via: 'qiwi',
  };
  http.post(
    'https://primepayer.com/pay',
    { body: JSON.stringify(data) },
    (req, res) => {
      console.log(req.body);
    },
  );
});

module.exports = userbalance;

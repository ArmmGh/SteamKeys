const db = require('../utils/db');
const userbalance = require('express').Router();
const crypto = require('crypto');
const Request = require('request');
const http = require('https');

require('dotenv').config();

userbalance.post('/addbalance', (req, res) => {
  const secret = process.env.prime_secret || '';
  const str = `
    ${secret
      .split('')
      .sort()
      .join(':')}:${secret}`;
  const sign = crypto
    .createHash('sha256')
    .update(str)
    .digest('base64');
  const data = {
    shop: 4285,
    payment: 110857,
    amount: req.body.sum,
    description: 'Оплата товара',
    currency: 3,
    sign,
    // via: 'qiwi',
  };
  Request.post(
    {
      url: 'https://primepayer.com/pay',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ data }),
    },
    (err, resp, body) => {
      res.send(data);
      if (err) {
        return console.dir(err);
      }
      console.dir(JSON.parse(body));
    },
  );
});

module.exports = userbalance;

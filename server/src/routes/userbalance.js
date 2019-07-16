const db = require('../utils/db');
const userbalance = require('express').Router();
const crypto = require('crypto');
const Request = require('request');
const http = require('https');
const uuid = require('uuid/v4');

require('dotenv').config();

userbalance.post('/addbalance', (req, res, next) => {
  const url = `https://any-pay.org/merchant?merchant_id=${
    process.env.merchant_id
  }&amount=${req.body.sum}&pay_id=${uuid()}&desc=Пополнение счёта&sign=${
    process.env.merchant_sign
  }`;
  res.redirect(url);
  res.send('');
  // next();
});

module.exports = userbalance;

const db = require('../utils/db');
const userbalance = require('express').Router();
const crypto = require('crypto');
const Request = require('request');
const http = require('https');
const uuid = require('uuid/v4');
const md5 = require('md5');

require('dotenv').config();

userbalance.post('/addbalance', (req, res) => {
  // const secret = process.env.prime_secret || '';
  // const str = `
  //   ${secret
  //     .split('')
  //     .sort()
  //     .join(':')}:${secret}`;
  // const sign = crypto
  //   .createHash('sha256')
  //   .update(str)
  //   .digest('base64');
  const data = {
    merchant_id: process.env.merchant_id,
    pay_id: uuid(),
    amount: req.body.sum,
    currency: 'RUB',
    desc: 'Пополнение счёта',
  };
  data.sign = md5(
    `${data.currency}:${data.amount}:${process.env.api_key}:${
      data.merchant_id
    }:${data.pay_id}`,
  );
  Request.post(
    {
      url: 'https://any-pay.org/merchant',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ...data }),
    },
    (err, resp, body) => {
      console.log(resp);
      console.log(JSON.parse(body));
      res.send(resp);
      if (err) {
        return console.dir(err);
      }
      console.dir(JSON.parse(body));
    },
  );

  // const url = `https://any-pay.org/merchant?merchant_id=${
  //   process.env.merchant_id
  // }&amount=${req.body.sum}&pay_id=${uuid()}&desc=Пополнение счёта&sign=${
  //   process.env.merchant_sign
  // }`;
  // res.redirect(url);
  // res.send('');
  // next();

  // https://any-pay.org/merchant
});

module.exports = userbalance;

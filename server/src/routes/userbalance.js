const db = require('../utils/db');
const userbalance = require('express').Router();
const crypto = require('crypto');
const Request = require('request');
const http = require('https');
const url = require('url');
const uuid = require('uuid/v4');
const redirect = require('express-redirect');
const md5 = require('md5');

require('dotenv').config();

redirect(userbalance);

userbalance.post('/addbalance', (req, res, next) => {
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
  // userbalance.redirect(
  //   '/addbalance',
  //   `https://any-pay.org/merchant?merchant_id=${data.merchant_id}&pay_id=${
  //     data.pay_id
  //   }&amount=${data.amount}&currency=${data.currency}&desc=${data.desc}`,
  //   'post',
  // );
  res.redirect(
    `https://any-pay.org/merchant?merchant_id=${data.merchant_id}&pay_id=${
      data.pay_id
    }&amount=${data.amount}&currency=${data.currency}&desc=${data.desc}`,
  );
  //   // res.redirect(
  //   //   url.format({
  //   //     pathname: 'https://any-pay.org/merchant',
  //   //     query: JSON.stringify({ ...data }),
  //   //   }),
  //   // );
  //   // Request.get(
  //   //   {
  //   //     url: 'https://any-pay.org/merchant',
  //   //     headers: { 'content-type': 'application/json' },
  //   //     body: JSON.stringify({ data }),
  //   //   },
  //   //   (err, resp, body) => {
  //   //     // res.redirect('https://any-pay.org/merchant');
  //   //     // res.send(resp);
  //   //     if (err) {
  //   //       return console.dir(err);
  //   //     }
  //   //     // res.send(body);
  //   //   },
  //   // );
});

module.exports = userbalance;

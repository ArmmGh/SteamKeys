const db = require('../utils/db');
const userbalance = require('express').Router();
const crypto = require('crypto');
const Request = require('request');
const http = require('https');
const url = require('url');
const uuid = require('uuid/v4');
// const redirect = require('express-redirect');
const md5 = require('md5');

require('dotenv').config();

// redirect(userbalance);
userbalance.post('/addbalance', (req, res, next) => {
  userbalance.post('/result', (reqq, ress) => {
    if (
      reqq.query.merchant_id === process.env.merchant_id &&
      reqq.query.amount &&
      reqq.query.pay_id
    ) {
      db.addBalance(
        {
          userID:
            (req.session.passport && req.session.passport.user.id) || null,
        },
        {
          merchant_id: reqq.merchant_id,
          pay_id: reqq.query.pay_id,
          amount: reqq.query.amount,
        },
      )
        .then(data => {
          // global.socket.emit('aaa', { a: 'AAAAA' });
          res.send({ ...data });
        })
        .catch(err => {
          console.log(err);
          return res.send(err);
        });
    }
  });
  // const data = {
  //   merchant_id: process.env.merchant_id,
  //   pay_id: uuid(),
  //   amount: req.body.sum,
  //   currency: 'RUB',
  //   desc: 'Пополнение счёта',
  // };
  // data.sign = md5(
  //   `${data.currency}:${data.amount}:${process.env.api_key}:${
  //     data.merchant_id
  //   }:${data.pay_id}`,
  // );
});

module.exports = userbalance;

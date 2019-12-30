const Router = require('express-router');
const db = require('../utils/db');
const jwt = require('../utils/token');
const passport = require('passport');
const Benefit = require('../models/Benefit');
const auth = require('express').Router();
const expressip = require('express-ip');

const host = process.env.FRONT_HOST || 'localhost';
const port = process.env.PORT || 5000;
const url =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://${host}/`;

require('dotenv').config();

auth.use(expressip().getIpInfoMiddleware);
auth.get('/steam', passport.authenticate('steam'));

auth.post('/benefit', async (req, res, next) =>{
    const newBenefit = new Benefit({
      name: req.body.name,
      rub: req.body.rub,
      wallet: req.body.wallet,
      time: new Date()
    });
    await newBenefit.save();
    res.send(newBenefit);
    next();
})

auth.get('/steam/return',
  passport.authenticate('steam', {failureRedirect: `${url}`,
  }),
  (req, res, next) => {
    const data = {
      username: req.user.displayName,
      userID: req.user.steamid || req.user.userID,
      profileurl: req.user._json.profileurl,
      imgurl: req.user._json.avatarfull,
      ip: req.ipInfo,
    };
    db.update(data);
    res.redirect(`${url}`);
    next();
  },
);

auth.get('/vkontakte', passport.authenticate('vkontakte'));

auth.get('/vkontakte/callback',
  passport.authenticate('vkontakte', {failureRedirect: `${url}` ,
  }),
  (req, res, next) => {
    const data = {
      username: req.user.displayName,
      userID: req.user.id,
      profileurl: req.user.profileUrl,
      imgurl: req.user._json.photo,
      ip: req.ipInfo,
    };
    db.update(data);
    res.redirect(`${url}`);
    next();
  },
);

auth.get('/logout', (req, res) => {
  req.logOut();
  res.send({
    isLogged: false,
    message: 'not logged in',
  });
});

auth.post('/setbenefit', (req, res) => {
  db.setDeposit(
    { userID: req.session.passport.user.id },
    {
      amount: req.body.amount,
      wallet: 'P1000',
      date: new Date(),
    }
  ).then(data => {
    data.benefitHistory.reverse();
    res.send({ ...data });
  });
});

auth.post('/storedata', (req, res) => {
  global.balanceHistory =
    global.balanceHistory && global.balanceHistory.length
      ? [
          ...global.balanceHistory,
          {
            userID: req.body.id,
            amount: req.body.sum,
            pay_id: req.body.pay_id,
          },
        ]
      : [
          {
            userID: req.body.id,
            amount: req.body.sum,
            pay_id: req.body.pay_id,
          },
        ];
});

auth.post('/result', (reqq, ress) => {
  // console.log(reqq);
  const elem = global.balanceHistory.find(
    el => el.pay_id === reqq.query.pay_id,
  );
  if (
    reqq.query.merchant_id === process.env.merchant_id &&
    reqq.query.amount &&
    reqq.query.pay_id
  ) {
    db.addBalance(
      {
        userID: elem.userID,
      },
      {
        merchant_id: reqq.merchant_id,
        pay_id: reqq.query.pay_id,
        amount: reqq.query.amount,
      },
    )
      .then(data => {
        global.balanceHistory = global.balanceHistory.filter(
          (el, i) => el.pay_id === reqq.query.pay_id,
        );
        return ress.send({ ...data });
      })
      .catch(err => ress.send(err));
  } else {
    ress.send('error');
  }
});

auth.get('/user', (req, res) => {
  if (
    req &&
    (req.user || (req.session.passport && req.session.passport.user))
  ) {
    db.login(req.user.id).then(user => {
      if (!user) {
        const regData = {
          isLogged: true,
          ip: req.ipInfo,
          email: req.user.email || req.user.id,
          username: req.user.displayName,
          userID: req.user.id,
          imgurl:
            req.user.provider === 'steam'
              ? req.user._json.avatarfull
              : req.user._json.photo,
          profileurl:
            req.user.provider === 'steam'
              ? req.user._json.profileurl
              : req.user.profileUrl,
        };
        return db.register(regData).then(newUser => {
          const data = {
            userID: req.user.id,
            username: req.user.displayName,
          };
          const token = jwt({ data });
          const userToken = jwt(newUser.toJSON());
          return res.send({
            username: req.user.displayName,
            userID: req.user.id,
            profileurl: req.user.profileUrl,
            imgurl: req.user._json.photo,
            isLogged: true,
            gameHistory:
              (req.user.gameHistory && req.user.gameHistory.reverse()) || [],
            balanceHistory: req.user.balanceHistory || [],
            benefitHistory: req.user.benefitHistory.reverse() || [],
            ip: newUser.ip,
          });
        });
      } else {
        return res.send({
          isLogged: true,
          username: req.user.displayName,
          userID: req.user.id,
          imgurl: req.user._json.avatarfull,
          profileurl: req.user._json.profileurl,
          gameHistory: user ? user.gameHistory.reverse() : [],
          balanceHistory: user ? user.balanceHistory : [],
          benefitHistory: user ? user.benefitHistory.reverse() : [],
          ip: req.ipInfo,
        });
      }
    });
  } else {
    res.send({
      isLogged: false,
      message: 'not logged in',
    });
  }
});

auth.post('/login', (req, res) => {
  const data = {
    userID: req.body.userID,
    username: req.body.username,
  };
  if (data.userID) {
    const token = jwt({ data });
    db.login(data.userID).then(user => {
      if (user == null) {
        // New User
        return db.register(req.body).then(newUser => {
          const userToken = jwt(newUser.toJSON());
          res.send({
            user: userToken,
            token,
            newUser: true,
            isLogged: true,
          });
        });
      }
      // Old User
      user.gameHistory.reverse();
      const userToken = jwt({ user });
      res.send({ user: userToken, token, newUser: false, isLogged: true });
      return false;
    });
  } else {
    res.send({ isLogged: false, message: 'not logged in' });
  }

});

module.exports = auth;

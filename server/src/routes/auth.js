const Router = require('express-router');
const open = require('open');
const db = require('../utils/db');
const request = require('request');
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

auth.post('/benefit', async (req, res, next) =>{
  const wallet = req.body.wallet;
  const resp = wallet.slice(0,6);
  const ansr = '******';
  const end = resp.concat(ansr)
    const newBenefit = new Benefit({
      rub: req.body.rub,
      wallet: end,
      time: new Date(),
    });
    await newBenefit.save();
    res.send(newBenefit);
    next();
})

auth.get('/steam', passport.authenticate('steam'));

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
    console.log(res);
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
      action: 'waiting',
      time: new Date().getTime() + 10000,
      date: new Date(),
    }
  ).then(data => {
    data.benefitHistory.reverse();
    res.send({ ...data });
  });
});

auth.post('/check', (req, res, next) => {
  const params = {
    infoId: req.body.infoId,
    infoSum: req.body.amount,
    infoInvoice: req.body.invoice,
    _id: req.body._id
  };
  const tax = Math.floor(params.infoSum * 0.0095 * 100) / 100 + params.infoSum + 0.01;
  const end = Math.round(tax * 100) / 100;
  console.log(tax)
  console.log(end);
  request({
    method: 'POST',
    url: 'https://payeer.com/ajax/api/api.php?historyInfo',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `account=P61234106&apiId=892776478&apiPass=778899&action=historyInfo&historyId=${params.infoId}`
  }, function (error, response, body) {
    const hallo = JSON.parse(body);
    console.log('Response:', hallo);
    console.log(params._id)
    if(params.infoInvoice == hallo.info.comment && params.infoSum || end == hallo.info.sumOut){
      db.takeIn(
        { userID: req.session.passport.user.id,
        _id: req.params._id },
        {
          _id: req.body._id,
          amount: req.body.amount
        }
      ).then(data => {
        data.inHistory.reverse();
        res.send({ ...data });
      });
    }else{
      console.log(error)
    }
  });
});

auth.post('/outin', (req,res) =>{
  const parames = {
    sum: req.body.amount,
    wallet: req.body.wallet,
  };
  request({
    method: 'POST',
    url: 'https://payeer.com/ajax/api/api.php?transfer',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `account=P61234106&apiId=892776478&apiPass=778899&action=transfer&curIn=RUB&sum=${parames.sum}&curOut=RUB&to=${parames.wallet}`
  }, function (error, response, body) {
    const searcher = JSON.parse(body);
    console.log(searcher)
    if(searcher.errors === false){
      db.outIn(
        { userID: req.session.passport.user.id },
        {
          amount: req.body.amount,
          wallet: req.body.wallet,
          date: new Date()
        }
      )
    }else{
      console.log('error')
    }
  });
})

auth.post('/investin', (req, res, next) => {
      db.investIn(
        { userID: req.session.passport.user.id },
        {
          amount: req.body.amount,
          invoice: req.body.invoice,
          action: 'waiting',
          date: new Date(),
        }
      ).then(data => {
        data.inHistory.reverse();
        res.send({ ...data });
      });
});

auth.post('/setbenefit', (req, res) => {
  db.investIn(
    { userID: req.session.passport.user.id },
    {
      amount: req.body.amount,
      action: 'waiting',
      wallet: req.body.wallet,
      date: new Date(),
    }
  ).then(data => {
    data.outHistory.reverse();
    res.send({ ...data });
  });
});

auth.post('/setwallet', (req, res) =>{
  db.setWallet(
    { userID: req.session.passport.user.id },
    {
      walletq: req.body.walletq,
      walletp: req.body.walletp,
    }
  ).then(data => {
    res.send({ ...data });
  });
})


auth.post('/getmoney', (req,res) =>{
  db.getMoney(
    { userID: req.session.passport.user.id },
    {
      _id: req.body._id,
      amount: req.body.amount
    }
  ).then(data => {
    data.benefitHistory.reverse();
    res.send({ ...data });
  })
})

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
            inHistory: req.user.inHistory.reverse() || [],
            outHistory: req.user.outHistory.reverse() || [],
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
          intHistory: user ? user.inHistory.reverse() : [],
          outHistory: user ? user.outHistory.reverse() : [],
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
      user.benefitHistory.reverse();
      user.gameHistory.reverse();
      user.inHistory.reverse();
      user.outHistory.reverse();
      const userToken = jwt({ user });
      res.send({ user: userToken, token, newUser: false, isLogged: true });
      return false;
    });
  } else {
    res.send({ isLogged: false, message: 'not logged in' });
  }

});

module.exports = auth;

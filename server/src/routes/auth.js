// const Router = require('express-router');
const express = require('express');
const db = require('../utils/db');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const auth = express.Router();
require('../utils/passport');
require('dotenv').config();

auth.get(
  '/auth',
  passport.authenticate('steam', { failureRedirect: '/' }),
  async ctx => {
    ctx.redirect('/');
  },
);
auth.get(
  '/auth/steam/return',
  passport.authenticate('steam', {
    failureRedirect: '/',
  }),
  async (ctx, next) => {
    const data = {
      username: ctx.req.user.displayName,
      steamid: ctx.req.user.id,
      profileurl: ctx.req.user._json.profileurl,
      imgurl: ctx.req.user._json.avatarfull,
    };
    await db.update(data);
    ctx.redirect('/');
    next();
  },
);
auth.get('/logout', async ctx => {
  ctx.logout();
  ctx.cookies.set('token', null);
  ctx.redirect('/');
});

auth.get('/user', async (req, res) => {
  if (req.body.user) {
    const data = {
      isLogged: true,
      username: req.body.user.displayName,
      steamid: req.body.user.id,
      imgurl: req.body.user._json.avatarfull,
      profileurl: req.body.user._json.profileurl,
    };
    res.send(data);
  } else {
    const data = {
      isLogged: false,
      message: 'not logged in',
    };
    res.send(data);
  }
});

auth.post('/login', async (req, res) => {
  const data = {
    steamid: req.body.steamid,
    username: req.body.username,
  };

  if (data.steamid) {
    const token = await jwt.createToken({ data });
    await db.login(data.steamid).then(user => {
      if (user == null) {
        console.log('New User');
        return db
          .register(req.body)
          .then(newUser => {
            const userToken = jwt.createToken(newUser);
            const registred = {
              user: userToken,
              token,
              newUser: true,
              isLogged: true,
            };
            res.send(registred);
          })
          .catch(e => console.log(e));
      }
      console.log('Old User');
      const userToken = jwt.createToken({ user });
      res.send({
        user: userToken,
        token,
        newUser: false,
        isLogged: true,
      });
      return false;
    });
  } else {
    res.send({
      isLogged: false,
      message: 'Not logged in',
    });
  }
});

module.exports = auth;

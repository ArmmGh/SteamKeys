// const Router = require('express-router');
const db = require('../utils/db');
const jwt = require('../utils/token');
const passport = require('passport');
const auth = require('express').Router();

const host = process.env.FRONT_HOST || 'localhost';
const port = process.env.PORT || 5000;
const url =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/SteamKeys/`
    : `https://${host}/SteamKeys/`;

// require('../utils/passport');
require('dotenv').config();

auth.get('/steam', passport.authenticate('steam'));

auth.get(
  '/steam/return',
  passport.authenticate('steam', {
    failureRedirect: `${url}`,
  }),
  (req, res, next) => {
    const data = {
      username: req.user.displayName,
      steamid: req.user.id,
      profileurl: req.user._json.profileurl,
      imgurl: req.user._json.avatarfull,
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

auth.get('/user', (req, res) => {
  if (req.user) {
    res.send({
      isLogged: true,
      username: req.user.displayName,
      steamid: req.user.id,
      imgurl: req.user._json.avatarfull,
      profileurl: req.user._json.profileurl,
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
    steamid: req.body.steamid,
    username: req.body.username,
  };
  if (data.steamid) {
    const token = jwt({ data });
    db.login(data.steamid).then(user => {
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
      const userToken = jwt({ user });
      res.send({ user: userToken, token, newUser: false, isLogged: true });
      return false;
    });
  } else {
    res.send({ isLogged: false, message: 'not logged in' });
  }
});

module.exports = auth;
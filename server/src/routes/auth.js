// const Router = require('express-router');
const db = require('../utils/db');
const jwt = require('../utils/token');
const passport = require('passport');
const auth = require('express').Router();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 5000;
const url =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `http://${host}/`;

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
    // res.redirect('/');
    next();
  },
);

auth.get('/logout', (req, res) => {
  res.logout();
  res.cookies.set('token', null);
  res.redirect('/');
});

auth.get('/user', (req, res) => {
  if (req.user) {
    const data = {
      isLogged: true,
      username: req.user.displayName,
      steamid: req.user.id,
      imgurl: req.user._json.avatarfull,
      profileurl: req.user._json.profileurl,
    };
    res.send({ data });
  } else {
    const data = {
      isLogged: false,
      message: 'not logged in',
    };
    res.send({ data });
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
        console.log('New User');
        return db
          .register(req.body)
          .then(newUser => {
            const userToken = jwt(newUser);
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
      const userToken = jwt({ user });
      res.send({
        user: userToken,
        token,
        newUser: false,
        isLogged: true,
      });
      return false;
    });
  } else {
    res.send({ data: { isLogged: false, message: 'not logged in' } });
  }
});

module.exports = auth;

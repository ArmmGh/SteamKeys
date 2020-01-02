const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2').Strategy;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const User = require('../models/User');

const { MAIL_APP_ID, MAIL_APP_SECRET } = process.env;
const { returnURLMail } = require('./url');

passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://oauth.mail.ru/login',
    tokenURL: 'https://oauth.mail.ru/token',
    clientID: MAIL_APP_ID,
    clientSecret: MAIL_APP_SECRET,
    callbackURL: "https://steam-keys.herokuapp.com/mail/callback",
    state: "some_state",
    scope: "userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    profile.email = profile.id;
      done(null, profile);
  }
));
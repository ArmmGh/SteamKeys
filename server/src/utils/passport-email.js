const passport = require('passport');
const MailruStrategy = require('passport-mail').Strategy;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { MAIL_APP_ID, MAIL_APP_SECRET } = process.env;

const { returnURLMail } = require('./url');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new MailruStrategy({
    clientID: MAIL_APP_ID,
    clientSecret: MAIL_APP_SECRET,
    callbackURL: returnURLMail,
  },
  (accessToken, refreshToken, params, profile, done) => {
    profile.email = profile.id;
    done(null, profile);
  },
));
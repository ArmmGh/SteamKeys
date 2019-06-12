const passport = require('passport');
const SteamStrategy = require('passport-steam').Strategy;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { KEY } = process.env;
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const { defaultURL, returnURL } = require('./url');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL,
      realm: defaultURL,
      apiKey: KEY,
    },
    (identifier, profile, done) => {
      process.nextTick(() => {
        // eslint-disable-next-line no-param-reassign
        profile.identifier = identifier;
        return done(null, profile);
      });
    },
  ),
);

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

exports.returnURLSteam =
  process.env.NODE_ENV === 'development'
    ? `http://steam-keys.herokuapp.com/auth/steam/return`
    : `https://steam-keys.herokuapp/auth/steam/return`;

exports.defaultURLSteam =
  process.env.NODE_ENV === 'development'
    ? `http://steam-keys.herokuapp.com/`
    : `https://steam-keys.herokuapp/`;

exports.returnURLVk =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/auth/vkontakte/callback`
    : `https://${host}/auth/vkontakte/callback`;
exports.defaultURLVk =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://${host}/`;

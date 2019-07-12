if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

exports.returnURLSteam =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/auth/steam/return`
    : `https://${host}/auth/steam/return`;

exports.defaultURLSteam =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://${host}/`;

exports.returnURLVk =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/auth/vkontakte/callback`
    : `httsp://${host}/auth/vkontakte/callback`;
exports.defaultURLVk =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://${host}/`;

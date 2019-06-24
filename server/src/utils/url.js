if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

exports.returnURL =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/auth/steam/return`
    : `https://${host}/auth/steam/return`;

exports.defaultURL =
  process.env.NODE_ENV === 'development'
    ? `http://${host}:${port}/`
    : `https://${host}/`;

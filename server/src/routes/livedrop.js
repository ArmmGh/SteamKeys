const db = require('../utils/db');
const passport = require('passport');
const livedrop = require('express').Router();

require('dotenv').config();

livedrop.get('/live', (req, res) => {
  db.getLivedrop().then(data => res.send(data.reverse().slice(0, 10)));
});

livedrop.get('/liveinfo', (req, res) => {
  db.getLiveinfo().then(data => res.send({ users: data[0], cases: data[1] }));
});
livedrop.get('/resinfo', (req, res) => {
  db.getRes().then(data => {
    res.send(JSON.stringify(data[0].amount))
  });
});


module.exports = livedrop;

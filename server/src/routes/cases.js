const db = require('../utils/db');
const cases = require('express').Router();

require('dotenv').config();

cases.post('/cases/:name', (req, res) => {
  db.getCase(req.params.name).then(response => res.send(response));
});

cases.post('/opencase', (req, res) => {
  db.removeBalance(
    { steamid: req.session.passport.user.id },
    {
      type: 'balance',
      sellPrice: req.body.winner.sellPrice || 9,
      caseType: req.body.case.type,
      name: req.body.winner.name,
      img: req.body.winner.img,
      price: req.body.case.priceRUB,
    },
  ).then(data => {
    res.send({ ...data });
  });
});

cases.post('/sellgame', (req, res) => {
  db.addBalance(
    { steamid: req.session.passport.user.id },
    {
      _id: req.body._id,
      name: req.body.name,
      caseType: req.body.caseType,
      sellPrice: req.body.sellPrice,
    },
  ).then(data => {
    res.send({ ...data });
  });
});

cases.post('/getkey', (req, res) => {
  db.getKey(
    { steamid: req.session.passport.user.id },
    {
      _id: req.body._id,
      name: req.body.name,
      caseType: req.body.caseType,
      sellPrice: req.body.sellPrice,
    },
  ).then(data => {
    res.send({ ...data });
  });
});

module.exports = cases;

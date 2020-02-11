const User = require('../models/User');
const Reserve = require('../models/Reserve');
const Cases = require('../models/Cases');
const Livedrop = require('../models/Livedrop');
const Rev = require('../models/Rev');
const Games = require('../models/Games');
const Profit = require('../models/Profit');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const { ADMIN1, ADMIN2 } = process.env;

const register = async data => {
  const user = await new User({
    ip: data.ip,
    email: data.email || data.username,
    username: data.username,
    userID: data.userID,
    imgurl: data.imgurl,
    admin: false,
    profileurl: data.profileurl,
    bonus: 'none',
    payment: 'no',
    walletq: '',
    walletp: '',
    balance: 0,
    gameHistory: [],
    balanceHistory: [],
    benefitHistory: [],
  });
  // eslint-disable-next-line no-unused-expressions
  data.userID === ADMIN1 || data.userID === ADMIN2
    ? (user.admin = await true)
    : null;
  await user.save();
  return user;
};

const login = userID => User.findOne({ userID });

const update = async user => {
  login(user.userID).then(data => {
    if (data !== null) {
      if (data.username !== user.username) {
        console.log('Changed name');
        User.updateOne(
          { userID: user.userID },
          { $set: { username: user.username } },
          { new: true },
          (err, doc) => doc,
        );
      }
      if (data.imgurl !== user.imgurl) {
        console.log('Changed image');
        User.updateOne(
          { userID: user.userID },
          { $set: { imgurl: user.imgurl } },
          { new: true },
          (err, doc) => doc,
        );
      }

      if (data.ip.city !== user.ip.city) {
        User.updateOne(
          { userID: user.userID },
          { $set: { ip: user.ip } },
          { new: true },
          (err, doc) => doc,
        );
      }
    } else {
      console.log('New User');
    }
  });
};

const getCase = type => Cases.findOne({ type }).then(res => res);

const getLivedrop = () => Livedrop.find({});
const getProfit = () => Profit.find({});
const getRev = () => Rev.find({});
const getRes = () => Reserve.find({ comment: "reserve" })

const setLivedrop = async data => {
  const drop = await new Livedrop(data.game);
  await drop.save();
  return drop;
};

const setCom = async data =>{
  const benef = await new Rev({
    name: data.profil.name,
    txt: data.profil.txt,
    time: new Date(),
  });
  await benef.save();
  return benef;
}

const setReserve = (user, data)=>{
  new Promise((resolve, reject) => {
    Reserve.findOne({ comment: "reserve" }).then(res => {
      Reserve.findOneAndUpdate(
        {
          comment: "reserve",
        },
        {
          $inc: {
          amount: + Number(data.amount)
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc || {}),
      );
    });
  });
}

const setProfit = async data =>{
  const benef = await new Profit({
    rub: data.profit.rub,
    wallet: data.profit.wallet,
    time: new Date(),
  });
  await benef.save();
  return benef;
}

const getGames = () => Games.find({});

const getLiveinfo = async () => {
  // Cases.deleteOne({ _id: {} }).then(res => console.log('done', res));
  const openCasesLength = () =>
    new Promise((resolve, reject) => {
      Profit.collection.countDocuments({}, {}, (err, res) => resolve(res));
    });

  const usersLength = () =>
    new Promise((resolve, reject) => {
      User.collection.countDocuments({}, {}, (err, res) => resolve(res));
    });

  return Promise.all([await usersLength(), await openCasesLength()]).then(
    val => val,
  );
};

const setDeposit = (user, data) => 
  new Promise((resolve, reject) =>{
    User.findOne({ userID: user.userID }).then(res =>{
      User.findOneAndUpdate(
        {
          userID: user.userID,
        },
        {
        $set: {
          balance: res.balance - Number(data.amount),
          benefitHistory: [
            ...res.benefitHistory,
            {
              amount: data.amount,
              action: 'waiting',
              time: new Date().getTime() + 10000,
              date: new Date(),
            },
          ],
        },
      },
      {new: true},
      (err,doc) => resolve(doc._doc || {}),
      );
    });
  });

  const setWallet = (user, data) => 
  new Promise((resolve, reject) =>{
    User.findOne({ userID: user.userID }).then(res =>{
      User.findOneAndUpdate(
        {
          userID: user.userID,
        },
        {
        $set: {
          walletp: data.walletp,
          walletq: data.walletq
        },
      },
      {new: true},
      (err,doc) => resolve(doc._doc || {}),
      );
    });
  });


const addBalance = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
        },
        {
          $set: {
            balance: res.balance + Number(data.amount),
            balanceHistory: [
              ...res.balanceHistory,
              {
                pay_id: data.pay_id,
                amount: data.amount,
                date: new Date(),
              },
            ],
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc || {}),
      );
    });
  });

  const investIn = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
        },
        {
          $set: {
            inHistory: [
              ...res.inHistory,
              {
                amount: data.amount,
                invoice: data.invoice,
                action: data.action,
                date: new Date(),
              },
            ],
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc || {}),
      );
    });
  });

  const takeIn = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
          'inHistory._id': data._id,
        },
        {
          $set: {
            payment: 'yes',
            balance: res.balance + data.amount,
            'inHistory.$.action': 'sent',
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc),
      );
    });
  });

  const outIn = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
        },
        {
          $set: {
            balance: res.balance - data.amount,
            outHistory: [
              ...res.outHistory,
              {
                amount: data.amount,
                wallet: data.wallet,
                date: new Date(),
              },
            ],
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc || {}),
      );
    });
  });

const sellGame = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
          'gameHistory._id': data._id,
        },
        {
          $set: {
            balance: res.balance + data.sellPrice,
            'gameHistory.$.action': 'selled',
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc),
      );
    });
  });

  const getMoney = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
          'benefitHistory._id': data._id,
        },
        {
          $set: {
            balance: res.balance + Math.floor(data.amount * 0.2 * 100) / 100 + data.amount,
            'benefitHistory.$.action': 'paid',
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc),
      );
    });
  });

const removeBalance = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      if (data.type === 'balance') {
        Livedrop.collection.countDocuments({}, {}, (error, count) => {
          const order = data.caseType === 'xujan' ? data.order : count + 1;
          User.findOneAndUpdate(
            { userID: user.userID },
            {
              $set: {
                bonus: 'done',
                gameHistory: [
                  ...res.gameHistory,
                  {
                    key: '',
                    order,
                    sellPrice: data.sellPrice,
                    caseType: data.caseType,
                    name: data.name,
                    action: 'waiting',
                    date: new Date(),
                  },
                ],
              },
            },
            { new: true },
            (err, doc) => resolve(doc._doc || {}),
          );
        });
      }
    });
  });

const getKey = (user, data) =>
  new Promise((resolve, reject) => {
    User.findOne({ userID: user.userID }).then(res => {
      User.findOneAndUpdate(
        {
          userID: user.userID,
          'gameHistory._id': data._id,
        },
        {
          $set: {
            'gameHistory.$.action': 'key',
          },
        },
        { new: true },
        (err, doc) => resolve(doc._doc),
      );
    });
  });

module.exports = {
  login,
  register,
  update,
  getCase,
  setLivedrop,
  getLivedrop,
  takeIn,
  investIn,
  outIn,
  setDeposit,
  setReserve,
  setCom,
  setWallet,
  setProfit,
  getRes,
  getProfit,
  getMoney,
  getGames,
  getRev,
  getLiveinfo,
  removeBalance,
  sellGame,
  getKey,
  addBalance,
};

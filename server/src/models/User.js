const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const userSchema = new Schema({
  ip: { city: String, country: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  userID: { type: String || Number, required: true },
  admin: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  profileurl: { type: String, required: true },
  bonus: {type: String, required: true},
  payment: {type: String, required: true},
  walletq: { type: String || Number },
  walletp: { type: String || Number },
  imgurl: { type: String },
  gameHistory: [
    {
      key: String,
      order: String || Number,
      name: String,
      action: String,
      sellPrice: Number,
      date: Date,
      caseType: String,
    },
  ],
  balanceHistory: [
    {
      pay_id: String || Number,
      amount: Number,
      date: Date,
    },
  ],
  benefitHistory: [
    {
      amount: Number,
      action: String,
      time: Number,
      date: Date,
    },
  ],
  inHistory: [
    {
      amount: Number,
      invoice: Number,
      action: String,
      date: Date,
    }
  ],
  outHistory: [
    {
      amount: Number,
      action: String,
      wallet: String || Number,
      date: Date,
    }
  ]
});

const user = mongoose.model('User', userSchema);
module.exports = user;

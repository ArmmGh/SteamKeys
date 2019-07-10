const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const userSchema = new Schema({
  ip: { city: String, country: String },
  email: { type: String, required: true },
  username: { type: String, required: true },
  userID: { type: Number, required: true },
  admin: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  profileurl: { type: String, required: true },
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
});

const user = mongoose.model('User', userSchema);
module.exports = user;

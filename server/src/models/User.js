const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  steamid: { type: Number, required: true },
  admin: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  profileurl: { type: String, required: true },
  imgurl: { type: String },
  gameHistory: [{ order: Number, name: String, action: String, date: Date }],
});

const user = mongoose.model('User', userSchema);
module.exports = user;

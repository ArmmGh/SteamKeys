const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const reserveSchema = new Schema({
  amount: { type: Number, required: true},
  comment: { type: String, required: true}
});

const reserve = mongoose.model('Reserve', reserveSchema);

module.exports = reserve;
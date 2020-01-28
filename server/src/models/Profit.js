const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const ProfitSchema = new Schema({
      rub: { type: Number, required: true },
      wallet: { type: String, required: true },
      time: {type: Date},
});

const Profit = mongoose.model('Profit', ProfitSchema);
module.exports = Profit;

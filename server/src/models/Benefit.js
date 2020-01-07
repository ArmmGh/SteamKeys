const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const BenefitSchema = new Schema({
      rub: { type: Number, required: true },
      wallet: { type: String, required: true },
      time: {type: Date},
});

const Benefit = mongoose.model('Benefit', BenefitSchema);
module.exports = Benefit;

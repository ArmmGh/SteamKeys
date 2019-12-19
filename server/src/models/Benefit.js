const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const BenefitSchema = new Schema({
      name: { type: String, required: true },
      rub: { type: Number, required: true },
      wallet: { type: String, required: true },
      time: {type: Date},
});

const cases = mongoose.model('Benefit', BenefitSchema);
module.exports = Benefit;

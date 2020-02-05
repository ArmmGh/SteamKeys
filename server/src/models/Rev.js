const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const { Schema } = mongoose;

const RevSchema = new Schema({
      name: { type: String, required: true },
      text: { type: String, required: true },
      time: {type: Date},
});

const Rev = mongoose.model('Rev',RevSchema);
module.exports = Rev;

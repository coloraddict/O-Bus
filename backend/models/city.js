const mongoose = require ('mongoose');

const citySchema = mongoose.Schema ({
  cityName: {type: String, required: true, trim: true},
  state: {type: String, required: true, trim: true},
});

module.exports = mongoose.model ('City', citySchema);

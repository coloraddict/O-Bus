const mongoose = require ('mongoose');

const citySchema = mongoose.Schema (
  {
    _id: {type: String},
    name: {type: String, required: true, trim: true},
    state: {type: String, required: true, trim: true},
    lat: {type: String, required: true, trim: true},
    lon: {type: String, required: true, trim: true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model ('City', citySchema);

const mongoose = require ('mongoose');

const travellerSchema = mongoose.Schema ({
  name: {type: String, required: true},
  age: {type: Number, required: true},
  gender: {type: String, required: true},
});

const userSchema = mongoose.Schema (
  {
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, trim: true},
    userName: {type: String, required: true, unique: true, trim: true},
    password: {type: String, required: true},
    travellers: {
      type: [travellerSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model ('User', userSchema);

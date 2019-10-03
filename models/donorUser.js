const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DonorSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true
  },

  password: {
    type: String,

    required: true
  },
  foto: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = donorUser = mongoose.model("donors", DonorSchema);

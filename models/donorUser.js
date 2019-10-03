const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DonorSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true,
    trim: true
  },
  // foto: {
  //   type: String,
  //   required: true,
  //   lowercase: true,
  //   trim: true,
  //   unique: true
  // },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = donorUser = mongoose.model("donors", DonorSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VolunteerSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
});

module.exports = User = mongoose.model("restaurants", RestaurantSchema);

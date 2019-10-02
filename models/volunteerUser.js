const mongoose = require("mongoose");

const schema = new mongoose.Schema({
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

const VolunteerUser = mongoose.model("VolunteerUser", schema);

module.exports = VolunteerUser;

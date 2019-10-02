const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  organisationName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  }
});

const VolunteerUser = mongoose.model("VolunteerUser", schema);

module.exports = VolunteerUser;

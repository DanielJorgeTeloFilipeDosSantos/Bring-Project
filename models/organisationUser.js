const mongoose = require("mongoose");
//use onject if when cross referencing to otehr models -->
//const ObjectId = mongoose.Schema.Types.ObjectId;

const organisationSchema = new mongoose.Schema({
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
  passwordHash: {
    type: String,
    required: true,
    trim: true
  }
});

const OrganisationUser = mongoose.model("OrganisationUser", organisationSchema);

module.exports = OrganisationUser;

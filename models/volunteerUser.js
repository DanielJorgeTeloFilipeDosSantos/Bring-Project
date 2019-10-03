"use strict";

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const volunteer2Schema = new mongoose.Schema({
  // firstname: {
  //   type: String,
  //   trim: true,
  //   required: true
  // },
  // lastname: {
  //   type: String,
  //   trim: true,
  //   required: true
  // },
  // email: {
  //   type: String,
  //   lowercase: true,
  //   trim: true,
  //   required: true,
  //   unique: true
  // },
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
  }
  //,
  // imageURL: {
  //   type: String,
  //   default: "../images/default-user-icon-4.jpg"
  // },
  // collectionEventsAttending: [
  //   {
  //     type: ObjectId,
  //     default: "",
  //     ref: "collectionEvent"
  //   }
  // ],
  // donationPost: [
  //   {
  //     type: ObjectId,
  //     default: "",
  //     ref: "DonationEvent",
  //     pickedUp: { type: Boolean, default: false }
  //   }
  // ]
});

const VolunteerUser2 = mongoose.model("volunteeruser2", volunteer2Schema);

module.exports = VolunteerUser2;

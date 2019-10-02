const mongoose = require("mongoose");
//use onject if when cross referencing to otehr models -->
//const ObjectId = mongoose.Schema.Types.ObjectId;

const collectionSchema = new mongoose.Schema({
  collectionEventName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  adress: {
    type: String,
    require: true
  },
  //   imageURL: {
  //     type: String,
  //     default: "../images/default-image.jpg"
  //     //required: true
  //   },
  date: {
    type: Date,
    required: true
  },
  //   time: {
  //     type: Date,
  //     required: true
  //   },
  creator: {
    type: ObjectId,
    ref: "OrganisationUser"
  }
});

const CollectionEvent = mongoose.model("CollectionEvent", collectionSchema);

module.exports = CollectionEvent;

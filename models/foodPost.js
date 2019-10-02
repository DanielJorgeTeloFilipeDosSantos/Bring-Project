const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,

      required: true
    },

    amount: {
      type: String,

      required: true
    },
    pickupTime: {
      type: String,

      required: true
    },
    //creator and ref ref:'Restaurant'
    creator: {
      type: String,

      required: true
    },

    date: {
      type: Date,

      default: Date.now
    }
  },
  { versionKey: false }
);

module.exports = User = mongoose.model("restaurants", RestaurantSchema);

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,

      required: true
    },

    password: {
      type: String,

      required: true
    },
    foto: {
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

module.exports = restaurantUser = mongoose.model(
  "restaurants",
  RestaurantSchema
);

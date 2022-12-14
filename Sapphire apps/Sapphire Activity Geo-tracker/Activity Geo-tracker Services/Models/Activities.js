const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const ActivitiesSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    locationLat: {
      type: Number,
      required: true,
    },
    locationLng: {
      type: Number,
      required: true,
    },
    participants: [
      {
        participant: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      },
    ],
  },
  { getters: true }
);

const Activity = mongoose.model("Activity", ActivitiesSchema);

module.exports = Activity;

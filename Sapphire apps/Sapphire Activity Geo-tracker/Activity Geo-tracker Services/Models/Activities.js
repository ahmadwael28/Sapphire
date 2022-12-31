const { string } = require("@hapi/joi");
const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
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
      type: string,
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

const File = mongoose.model("Activity", FileSchema);

module.exports = File;

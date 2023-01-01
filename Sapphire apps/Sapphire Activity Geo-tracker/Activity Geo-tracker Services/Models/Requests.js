const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const RequestsSchema = new mongoose.Schema(
  {
    activityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Activity",
    },
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "PENDING",
    },
  },
  { getters: true }
);

const Request = mongoose.model("Requests", RequestsSchema);

module.exports = Request;

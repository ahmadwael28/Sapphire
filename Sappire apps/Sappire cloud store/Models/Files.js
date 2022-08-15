const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    size: {
      type: Number,
      required: false,
      defalut: 0,
    },
    storageName: {
      type: String,
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "",
    },
    extension: {
      type: String,
      required: true,
      default: "",
    },

    // status:{
    //     type:String,
    //     required:true,
    //     default:"Pending"
    // },
  },
  { getters: true }
);

const File = mongoose.model("File", FileSchema);

module.exports = File;

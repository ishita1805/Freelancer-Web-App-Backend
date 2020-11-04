const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  url: {
    type: String,
    unique:true
  },
  publicId: {
    type: String,
    unique:true
  }
}) ;

module.exports = mongoose.model("Photo", photoSchema);

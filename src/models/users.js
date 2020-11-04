const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  number: {
      type:Number,
      required:true,
      unique:true
  },
  role:{
    type:String,
    required:true
  },
  jobsApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  jobsHired: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
  portolio:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
    },
  ]
});

module.exports = mongoose.model("User", userSchema);

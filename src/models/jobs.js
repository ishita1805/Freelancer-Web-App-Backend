const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status:{
    type: String,
    required: true,
    default: "active"
  },
  vacancy:{
    type:Number,
    required:true
  }
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

jobSchema.virtual('applicants', {
  ref:'User',
  localField:'_id',
  foreignField:'jobsApplied',
  justOne:false
});



module.exports = mongoose.model("Job", jobSchema);

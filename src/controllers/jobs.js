const mongoose = require("mongoose");
const Job = require("../models/jobs");
const User = require("../models/users");

// create a job (hirer only)
exports.createJob = (req, res, next) => {
    const job = new Job ({
        _id:mongoose.Types.ObjectId(),
        title:req.body.title,
        company:req.body.company,
        duration:req.body.duration,
        description:req.body.description,
        owner:req.body.owner,
        status:req.body.status,
        vacancy:req.body.vacancy
    })
    job
        .save()
        .then((data)=>{
            res.status(201).json({
                message:"Job created",
                data:data
            })
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({
                error:"There was an error creating the job"
            })
        })
}

// apply for a job (artists only)
exports.applyJob = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId,{ $push: { jobsApplied : req.body.jobsApplied } })
    .then((data) => {
        res.status(200).json({
            message:"Applied for Job"
        });
    })
    .catch(() => {
        res.status(500).json({
            error:"Error applying for job"
        });
    });
}

// get a list of all jobs
exports.getJobs = (req, res, next) => {
    Job.find()
      .populate('applicants')
      .then((data) => res.status(201).json({
          jobs:data
        }))
      .catch(() =>
        res.status(500).json({
          error: "Could not get job list",
        })
      );
};

// search for one job
exports.getOneJob = (req, res, next) => {
    Job.findOne({_id:req.body.jobId})
      .populate('applicants')
      .then((data) => res.status(201).json({
          jobs:data
        }))
      .catch(() =>
        res.status(500).json({
          error: "Could not get job list",
        })
      );
};

// delete a job
exports.deleteJob = (req, res, next) => {
  Job.findByIdAndUpdate(req.body.jobId,{ $set: { status : "removed" } })
  .then((data) => {
      res.status(200).json({
          message:"Job deleted",
          data:data
      });
  })
  .catch(() => {
      res.status(500).json({
          error:"Error deleting for job"
      });
  });
}

// hire an artist 
exports.hireJob = (req, res, next) => {
  // uppdating the status in the jobs document
  Job.findByIdAndUpdate(req.body.jobId,{
    $inc: {vacancy: -1},
  })
    .then((data)=>{
      if(data.vacancy-1<1){
        Job.findByIdAndUpdate(req.body.jobId,{
          $set: {status: "completed"},
        })
        .catch((e)=>{
          console.log(e)
          res.status(500).json({
            error:"Error hiring"
          })
        })
      }
        
      // updating the user schema

      User.findByIdAndUpdate(req.body.userId,{ $pull: { jobsApplied : req.body.jobId } })
      .then((data) => {
        User.findByIdAndUpdate(req.body.userId,{ $push: { jobsHired : req.body.jobId } })
        .then(()=>{
            return res.status(200).json({
              message:"Artist hired successfully"
          });
        })
        .catch((e) => {
          console.log(e)
            res.status(500).json({
                error:"Error hiring"
            });
        });

      
      })
      .catch((e) => {
        console.log(e)
          res.status(500).json({
              error:"Error hiring"
          });
      });


    })
    .catch((e)=>{
      console.log(e)
      res.status(500).json({
        error:"Error hiring"
    })
  })
 
}
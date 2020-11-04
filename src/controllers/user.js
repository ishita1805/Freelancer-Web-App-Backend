const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// get a list of all users
exports.getUsers = (req, res, next) => {
    User.find()
      .then((data) => res.status(201).json(data))
      .catch((err) =>
        res.status(500).json({
          error: "Could not get user list",
        })
      );
};

// create a new user
exports.createUser = (req, res, next) => {
  User.find({ email: req.body.email }).then((data) => {
    if (data.length >= 1) {
      return res.status(409).json({
        message: "Email exists!",
      });
    } else {
      bcrypt.hash(req.body.password, 8, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {

          const user = new User({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            email:req.body.email,
            role:req.body.role,
            password: hash,
            number:req.body.number
          });

          user
            .save()
            .then((data) => {
              res.json({
                message: "User created!",
                id: data._id,
                email: data.email,
                role:data.role
              });
            })
            .catch((e) => {
              console.log(e);
            });
        }
      });
    }
  });
};

// login
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email})
  .then((data)=>{
    if(!data)
    return res.status(401).json({
      message:'User not found'
    });
    bcrypt.compare(req.body.password, data.password, (err, result) => {
      if(!result)
      return res.status(401).json({
        message:'Incorrect password'
      });

      const token = jwt.sign(data.toJSON(), process.env.ACCESS_TOKEN_SECRET)               
      res.cookie("jwt", token, {
          httpOnly: true,
      }); 
      res.cookie("role", data.role, {
        httpOnly: true,
      }); 
      res.cookie("isLogged", "true")
      res.status(200).json({
        message:"User logged in" 
      }) 
    });
  })
  .catch((e)=>{
    res.status(500).json({
      error:"something went wrong"
    })
  })
}

// logout
exports.logout =  (req, res, next) => {
  res.clearCookie('jwt')
  res.clearCookie('role')
  res.clearCookie('isLogged')
  res.status(200).json({message:"logged out"})
}

// (single user details) display portfolio
exports.getPortfolio = (req, res, next) => {
  User.findOne({_id:req.body.userId})
    .populate("portolio")
    .then((data) => res.status(201).json(data))
    .catch((err) =>
      res.status(500).json({
        error: "Could not get user list",
      })
    );
};


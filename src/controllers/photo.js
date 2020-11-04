const mongoose = require("mongoose");
const Photo = require("../models/photo");
const User = require("../models/users");
const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name:"dk61kyoxd",
    api_key:"589872813843811",
    api_secret:"lADV6Em1XNa3869h6EGa_o4UZHI"
  })

// add images to portfolio 
exports.portfolio = (req, res, next) => {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (result, err)=>{
      if(err) 
      return  res.status(500).json({
        error:"Picture not uploaded to portfolio",
      }) 
      const id = mongoose.Types.ObjectId()
      console.log(id)
      const photo = new Photo({
        _id: id,
        url: result.url,
        publicId:result.public_id
      });

      photo.save()
      .then(()=>{
        User.findByIdAndUpdate(req.body.userId,{ $push: { portolio : id } })
        .then(()=>{
            res.status(201).json({
                message:"Picture uploaded to portfolio"
            }) 
        })
        .catch((e)=>{
            console.log(e)
            res.status(500).json({
                error:"Picture not uploaded to portfolio"
            }) 
        })

      })
      .catch((e)=>{
        console.log(e)
        res.status(500).json({
            message:"Picture not uploaded to portfolio"
        }) 
      })

    })
  }
  
  // delete images from portfolio
  exports.deletePhoto = (req, res, next) => {
    const userId = req.body.userId;
    const photoId = req.body.photoId;
    const publicId = req.body.publicId;

    cloudinary.v2.uploader.destroy(publicId, (err,result)=>{
      if(err) 
      return  res.status(500).json({
        message:"Picture not deleted from portfolio",
        error:err
      }) 

      User.findByIdAndUpdate(userId,{ $pull: { portolio : photoId } })
      .then(()=>{
        Photo.findByIdAndDelete(photoId)
        .then(()=>{
          res.status(201).json({
            message:"Picture delted from portfolio"
          }) 
        })
        .catch(()=>{
          res.status(500).json({
            message:"Picture not deleted from portfolio"
          }) 
        })
      })
      .catch(()=>{
        res.status(500).json({
          message:"Picture not deleted from portfolio"
        }) 
      })
    })
  }

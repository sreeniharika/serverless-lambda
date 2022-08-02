const mongoose = require('mongoose');

const {Schema} = mongoose;

const videoSchema = new Schema({

  title: {
    type: String,
    trim: true,
    required: true
   },

   url: {
    type: String,
    trim: true,
    required: true
   },
   userName: {
    type: String,
    trim: true,
    required: true
   },

   location:{
    type:String,
    trim: true,
    required: true
   },
   
   description:{
    type:String,
    trim: true,
    required: true
   }
});

module.exports = mongoose.model('Video',videoSchema)


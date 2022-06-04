const mongoose = require('mongoose');


// User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter your name'],  
      },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
    },
    password: {
        type: String,
        required: false
    },
    // roles:{
    //     type: String,
    //     enum: ["user", "admin", "super_admin"],
    //     default: ["user"]
    // }
  },{
      timestamps: true
  });


  module.exports =  mongoose.model('USER', UserSchema);
const mongoose = require('mongoose');

// UserToken Schema
const UserToken = new mongoose.Schema({
    userId: {
     type: mongoose.Schema.Types.ObjectId,
     require: true,
    },
    token: {
		type: String,
		required: true,
	},
    createdAt: {
		type: Date,
		default: Date.now,
		expires: 30 * 86400, // 30 days
	},
  });


  module.exports =  mongoose.model('USERToken', UserToken);
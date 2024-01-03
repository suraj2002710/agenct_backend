const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description:{
    type:String,
    unique:true
  },
  route:{
    unique:true,
    type:String
  }
},{timestamps:true});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;

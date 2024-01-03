const mongoose = require('mongoose');

const MessagesSchema = new mongoose.Schema({
  Type:{
    type:String,
    enum:["outbound","inbound"]
  },
  Method:{
    type:String,
    enum:["mass","single"]
  },
  Patient_contact:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient_contact"
  },
  messages:{
    type:String,
  },
  readable:{
    type:Boolean,
    default:false
  }


},{timestamps:true});

const Messages = mongoose.model('Messages', MessagesSchema);

module.exports = Messages;
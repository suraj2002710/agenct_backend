const mongoose = require('mongoose');

const Patient_contactSchema = new mongoose.Schema({
  first_name:{
    type:String,
  },
  last_name:{
    type:String,
  },
  relationship:{
    type:String,
  },
  phone:{
    type:Number,
  },
  email:{
    type:String,
  },
  patient_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient"
  },
  unknown:{
    type:Boolean,
    default:false
  },

},{timestamps:true});

const Patient_contact = mongoose.model('Patient_contact', Patient_contactSchema);

module.exports = Patient_contact;
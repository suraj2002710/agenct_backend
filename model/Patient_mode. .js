const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  first_name:{
    type:String,
  },
  last_name:{
    type:String,
  }
},{timestamps:true});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
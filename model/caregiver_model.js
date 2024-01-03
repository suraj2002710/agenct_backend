const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
  agency: { type: String, ref: 'Agency',type:mongoose.Schema.Types.ObjectId },
  agencyEmployeeId: { type: String, required: true },
  firstName: {type:String,default:null},
  lastName: {type:String,default:null},
},{timestamps:true});

const Caregiver = mongoose.model('Caregiver', caregiverSchema);

module.exports = Caregiver;

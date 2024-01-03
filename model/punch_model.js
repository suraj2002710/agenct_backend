const mongoose = require('mongoose');

const punchSchema = new mongoose.Schema({
  caregiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Caregiver' },
  agency: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' },
  position: String,
  type: { type: String, enum: ['In', 'Out'] },
  utcTime: { type: Date },
  punchuser:{
    type: mongoose.Schema.Types.ObjectId, ref: 'users'
  },
  facility_id:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Facility'
  },
  scanResult:String, //empId,agency_id,in,out,position
  locationId:String,
  kioskId:String,
  timestam:{
    type:Date
  }
},{timestamps:true});

const Punch = mongoose.model('Punch', punchSchema);

module.exports = Punch;

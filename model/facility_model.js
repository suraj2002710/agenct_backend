const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company',required:true },
  name: { type: String, required: true,required:true  },
  timezone: { type: String, required: true },
  phone: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  scanner_id: String,
  locationId:String
},{timestamps:true});

const Facility = mongoose.model('Facility', facilitySchema);

module.exports = Facility;

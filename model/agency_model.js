const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  contactEmail: { type: String, required: true },
},{timestamps:true});

const Agency = mongoose.model('Agency', agencySchema);

module.exports = Agency;

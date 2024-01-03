const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  city: String,
  state: String,
  zip: String,
},{timestamps:true});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

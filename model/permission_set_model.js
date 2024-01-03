const mongoose = require('mongoose');

const permissionSetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
},{timestamps:true});

const PermissionSet = mongoose.model('PermissionSet', permissionSetSchema);

module.exports = PermissionSet;

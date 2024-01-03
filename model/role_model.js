const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  permissionSets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PermissionSet' }],
},{timestamps:true});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

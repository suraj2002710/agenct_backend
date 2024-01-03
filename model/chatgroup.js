const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    group_type:{
        type:String,
        enum:["individual","mass"],
        required: true
    },
    patient_id:{
        type:mongoose.Schema.Types.ObjectId,  // to knows the group's patient_id
        ref:"Patient"
    },                           
    members: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Patient_contact", required: true
        }
    ],
}, { timestamps: true })
const ChatGroup = new mongoose.model('chatgroup', schema);

module.exports = ChatGroup;

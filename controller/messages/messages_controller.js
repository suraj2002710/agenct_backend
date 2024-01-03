
const socket_variable = require("../..")
const Messages = require("../../model/messages_mode")
const Patient_contact = require("../../model/patient_contact_model")
const patientconatc_model = require("../../model/patient_contact_model")
const mongoose = require("mongoose")

exports.create_messages = async (req, res) => {
    try {
        const { Type, Method, Patient_contact, messages, group_id, chatType, patient_id } = req.body
        console.log(Patient_contact)


        if (chatType == "onebyone") {
            if (!Patient_contact) {
                return (res.status(200).send({
                    status: true,
                    msg: "Patient Id Are required",
                }))
            }

            let create_messages
            if (Patient_contact.length > 1) {

                Patient_contact.forEach(async (it) => {
                    const createmsg = await Messages.create({
                        Type, Method, messages, Patient_contact: it,
                    })
                    console.log(createmsg)
                })
            }
            else {
                create_messages = await Messages.create({
                    Type, Method, messages, Patient_contact: Patient_contact[0]
                })
            }

            return (res.status(200).send({
                status: true,
                msg: "create message",
                data: create_messages
            }))


        }

        if (chatType == "group") {
            const create_messages = await Messages.create({
                Type, Method, messages, group_id
            })

            if (create_messages) {
                return (res.status(200).send({
                    status: true,
                    msg: "create message",
                    data: create_messages
                }))
            }

            return (res.status(200).send({
                status: false,
                msg: "message not create",
            }))
        }
        else {
            return (res.status(400).send({
                status: false,
                msg: "invalid chatType",
            }))
        }



    } catch (err) {

        res.status(500).send({
            status: false,
            msg: err.message
        })

    }
}

exports.get_messages = async (req, res) => {
    try {
        const { Patient_contact, chatType, limit } = req.body
        
        if (chatType == "onebyone") {

            await Messages.updateMany({ Patient_contact: Patient_contact }, { $set: { readable: true } })

            const grouping = await Messages.aggregate([
                {
                    $match: {
                        Patient_contact: new mongoose.Types.ObjectId(Patient_contact),
                    },
                },
                {
                    $sort: {
                        createdAt: -1, 
                    },
                },
                
                {
                    $limit: limit, 
                    
                },
                {
                    $group: {
                        _id: {
                            year: { $year: '$createdAt' },
                            month: { $month: '$createdAt' },
                            day: { $dayOfMonth: '$createdAt' },
                        },
                        
                        
                        messages: { $push: '$$ROOT' },
                    },
                },
                {
                    $project: {
                        _id: 1,
                        messages: {
                            $reverseArray: '$messages', 
                        },
                    },
                },
                {
                    $sort: {
                        '_id.year': -1,
                        '_id.month': -1,
                        '_id.day': -1,
                    },
                },
            ]);

            const count = await Messages.countDocuments({
                Patient_contact: Patient_contact
            })
            
            return (res.status(200).send({
                status: true,
                data: grouping.reverse(),
                count,
                
            }))

        }

        // if (chatType == "unknown") {
        //     const find_message = await Messages.find({
        //         group_id
        //     }).skip(skip).limit(limit)

        //     const count = await Messages.coundDocuments({
        //         group_id
        //     })

        //     return (res.status(200).send({
        //         status: true,
        //         count,
        //         data: find_message
        //     }))



        // }
        else {
            return (res.status(400).send({
                status: false,
                msg: "invalid chatType",
            }))
        }
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

exports.fetch_messages_from_tiwlio = async (req, res) => {
    try {
        const { phone, messages } = req.body

        const find_contact = await Patient_contact.findOne({ phone: phone })
        let create_messages
        if (find_contact) {
            await Messages.create({
                Type: "inbound", Method: "single", messages, Patient_contact: find_contact._id
            })
            console.log("socket_variable", socket_variable)
        }
        else {

            const create_contact = await Patient_contact.create({
                last_name: "", first_name: "", relationship: "", phone, email: "", unknown: true
            })
            const msg_create = await Messages.create({
                Type: "inbound", Method: "single", messages, Patient_contact: create_contact._id
            })


            return (res.status(200).send({
                status: true,
                msg: "create message",
                data: { msg: msg_create, contact: create_contact }
            }))

        }




    } catch (err) {

        res.status(500).send({
            status: false,
            msg: err.message
        })

    }
}

exports.fetch_new_messages = async (req, res) => {
    try {


        const find_patient = await Patient_contact.find({ unknown: true })
        const ids = find_patient.map((it) => it._id)
        const find_msg_cout = await Messages.countDocuments({ Type: "inbound", readable: false, Patient_contact: { $nin: ids } })
        console.log(ids)
        const find_unknown_msg_count = await Messages.countDocuments({ Type: "inbound", readable: false, Patient_contact: { $in: ids } })

        res.status(200).send({
            status: false,
            msg_count: find_msg_cout,
            unknown_msg_count: find_unknown_msg_count
        })

    } catch (err) {

        res.status(500).send({
            status: false,
            msg: err.message
        })

    }
}

exports.read_msg = async (req, res) => {
    try {
        const {contact_id}=req.body

        await Messages.updateMany({ Patient_contact: contact_id }, { $set: { readable: true } })
        res.status(200).send({
            status: true,
            msg:"msg reading"
        })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })

    }
}

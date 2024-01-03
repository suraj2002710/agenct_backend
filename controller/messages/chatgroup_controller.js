const Patient = require("../../model/Patient_mode. ")
const ChatGroup = require("../../model/chatgroup")
const Patient_contact = require("../../model/patient_contact_model")

exports.create_group = async (req, res) => {
    try {
        const { members, group_type, patient_id } = req.body

        let group_name
        if (patient_id) {
            const find_patient = await Patient.findOne({ _id: patient_id })
            group_name = find_patient.first_name + " " + find_patient.last_name

        }


        const create_group = await ChatGroup.create({
            members, createdBy: req.user._id, groupName: group_name ? group_name : "mass groups", group_type, members, patient_id
        })

        if (create_group) {
            return (res.status(200).send({
                status: true,
                msg: "create group successfully",
                data: create_group
            }))
        }

        return (res.status(200).send({
            status: false,
            msg: "not create",
        }))

    } catch (err) {

        res.status(200).send({
            status: false,
            msg: err.message
        })

    }
}

exports.get_group = async (req, res) => {
    try {

        const {page,limit}=req.query
        let skip=(page-1)*limit
        const get_group = await ChatGroup.find({}).skip(skip).limit(limit)

        return (res.status(200).send({
            status: true,
            data: get_group
        }))




    } catch (err) {
        res.status(200).send({
            status: false,
            msg: err.message
        })

    }
}

exports.get_all_chats = async (req, res) => {
    try {
        const { type, limit, page } = req.body

        let skip = (page - 1) * limit

        if (type == "all") {
            const get_group = await ChatGroup.find({})
            const get_patient_contact = await Patient_contact.find({})
            const count=await Patient_contact.countDocuments()
            const count1=await ChatGroup.countDocuments()
            let data=[...get_group, ...get_patient_contact]
            return (res.status(200).send({
                status: true,
                data: data.slice(skip, limit + skip),
                count:count+count1
            }))

        }
        if (type == "individual") {
            const get_group = await ChatGroup.find({ group_type: type }).skip(skip).limit(limit)
            const count=await ChatGroup.countDocuments({ group_type: type })


            return (res.status(200).send({
                status: true,
                data: get_group,
                count
            }))
        }
        if (type == "group") {
            const get_group = await ChatGroup.find({}).skip(skip).limit(limit)
            const count=await ChatGroup.countDocuments()

            return (res.status(200).send({
                status: true,
                data: get_group,
                count
            }))

        }



    } catch (err) {
        res.status(200).send({
            status: false,
            msg: err.message
        })

    }
}
const Agency = require("../../model/agency_model")
const Caregiver = require("../../model/caregiver_model")
const Facility = require("../../model/facility_model")
const Punch = require("../../model/punch_model")
const moment = require("moment")
const mongoose = require("mongoose")
const { roles_Name } = require("../../permission_constant")
const convertformatTime = (inputDateTime) => {

    // Parse the input date and time string
    const year = inputDateTime.slice(0, 4);
    const month = inputDateTime.slice(4, 6);
    const day = inputDateTime.slice(6, 8);
    const hours = inputDateTime.slice(8, 10);
    const minutes = inputDateTime.slice(10, 12);
    const ampm = inputDateTime.slice(12).toLowerCase();

    // Determine if it's AM or PM
    let period = "AM";
    if (ampm === "pm" && hours !== "12") {
        period = "PM";
    } else if (ampm === "am" && hours === "12") {
        hours = "00"; // Convert 12:XX AM to 00:XX AM
    }

    // Create the formatted date and time string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${period}`;

    return formattedDateTime

}

const punch_row = async (req) => {
    try {
        const { punch, facility_id } = req.body
        let input = punch?.split('-')

        console.log(input)
        const today = moment();
     
        const find_facility = await Facility.find({ company: req.user.company })
        const check_facility = find_facility.filter((it) => {
            console.log(it._id, facility_id, it._id.toString() === facility_id)
            if (it._id.toString() === facility_id) {
                return true
            }
        })

     

        if (!check_facility.length) {
            console.log("facility error")
            return null
        }

        // Calculate the next date by adding one day
        const nextDate = today.clone().add(1, 'days');

        // Format the dates as strings in a desired format (e.g., YYYY-MM-DD)
        const todayFormatted = today.format('YYYY-MM-DD');
        const nextDateFormatted = nextDate.format('YYYY-MM-DD');

        console.log("Today's Date:", todayFormatted);
        console.log("Next Date:", nextDateFormatted);


        const dateTime = moment(convertformatTime(input[4]), 'YYYY-MM-DD hh:mm A');
        const time = dateTime.format("hh:mm A");
        console.log(time)
        const findagency = await Agency.findOne({ Id: input[0] })
        if (!findagency) {
            console.log("Agency Not Found")
            throw new Error('Agency Not Found');
        }

        const finddata = await Caregiver.findOne({ agencyEmployeeId: input[1] })
        console.log(finddata?._id)
        if (!finddata) {

            const createCaregiver = await Caregiver.create({
                agency: findagency?._id, agencyEmployeeId: input[1], firstName: "", lastName: ""
            })

            const createpunch = await Punch.create({
                caregiver: createCaregiver?._id,
                agency: findagency._id, position: input[2], utcTime: convertformatTime(input[4]),
                type: input[3], punchuser: req?.user?._id, facility_id
            })

            return createpunch
        }
        console.log(convertformatTime(input[4]))



        const createpunch = await Punch.create({
            caregiver: finddata?._id,
            agency: findagency._id, position: input[2], utcTime: convertformatTime(input[4]),
            type: input[3], punchuser: req?.user?._id, facility_id
        })



        return createpunch



    } catch (error) {
        console.log("error=========>>>>>>>>",error)
        return null
    }
}

exports.createCaregiver = async (req, res) => {
    try {
        const { punch, facility_id, scanResult, locationId, kioskId, timestamp } = req.body
        console.log(scanResult, locationId, kioskId, timestamp)
        let roles = req.user.roles.map((it) => it.name)
        const row = await punch_row(req)
        console.log("row", row)
        if (row) {
            console.log("row exits",roles,roles.includes(roles_Name.Company_manger))
            if (roles.includes(roles_Name.Company_manger)) {
                await Punch.updateOne({ _id: row._id }, { $set: { scanResult, locationId, kioskId, timestamp } })
            }
        } else {
            console.log("row not exits")
            if (roles.includes(roles_Name.Company_manger)) {
                await Punch.create({ scanResult, locationId, kioskId, timestamp })
            }
        }
        res.status(200).send({
            status: true,
            msg: "punch create"
        })
        // let input = punch?.split('-')

        // console.log(input)
        // const today = moment();
        // console.log(req.user)
        // const find_facility=await Facility.find({company:req.user.company})
        // const check_facility=find_facility.filter((it)=>{
        //     console.log(it._id,facility_id,it._id.toString()===facility_id)
        //     if(it._id.toString()===facility_id){
        //         return true
        //     }
        // })

        // console.log(check_facility)

        // if(!check_facility.length){
        //     return(res.status(401).send({
        //         status:false,
        //         msg:"You are not unauthorized for this operation"
        //     }))
        // }

        // // Calculate the next date by adding one day
        // const nextDate = today.clone().add(1, 'days');

        // // Format the dates as strings in a desired format (e.g., YYYY-MM-DD)
        // const todayFormatted = today.format('YYYY-MM-DD');
        // const nextDateFormatted = nextDate.format('YYYY-MM-DD');

        // console.log("Today's Date:", todayFormatted);
        // console.log("Next Date:", nextDateFormatted);


        // const dateTime = moment(convertformatTime(input[4]), 'YYYY-MM-DD hh:mm A');
        // const time = dateTime.format("hh:mm A");
        // console.log(time)
        // const findagency = await Agency.findOne({ Id: input[0] })
        // if (!findagency) {
        //     throw new Error('Agency Not Found');
        // }

        // const finddata = await Caregiver.findOne({ agencyEmployeeId: input[1] })
        // console.log(finddata?._id)
        // if (!finddata) {

        //     const createCaregiver = await Caregiver.create({
        //         agency: findagency?._id, agencyEmployeeId: input[1], firstName: "", lastName: ""
        //     })

        //     const createpunch = await Punch.create({
        //         caregiver: createCaregiver?._id,
        //         agency: findagency._id, position: input[2], utcTime: convertformatTime(input[4]),
        //         type: input[3], punchuser: req?.user?._id, facility_id
        //     })

        //     return (res.status(200).send({
        //         status: true,
        //         msg: "punch created",
        //         createpunch
        //     }))
        // }
        // console.log(convertformatTime(input[4]))



        // const createpunch = await Punch.create({
        //     caregiver: finddata?._id,
        //     agency: findagency._id, position: input[2], utcTime: convertformatTime(input[4]),
        //     type: input[3], punchuser: req?.user?._id, facility_id
        // })



        // res.status(200).send({
        //     status: true,
        //     msg: "punch created",
        //     createpunch
        // })



    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.getallCaregiver = async (req, res) => {
    try {
        const { startdate, enddate, position, agency, facility_id } = req.query
        let filter = { facility_id: facility_id }
        if (startdate && enddate) {
            filter.utcTime = {
                $gte: startdate, $lte: enddate
            }
        }
        if (position) {
            filter.position = position
        }
        if (agency) {
            filter.agency = agency
        }

        console.log(filter)

        // if (req.user.facility.length == 0) {
        //     return (
        //         res.status(400).send({
        //             status: false,
        //             msg: "data not match your facility"
        //         })
        //     )
        // }



        const finddata = await Punch.find(filter).populate("agency caregiver punchuser facility_id")





        // console.log(findnewdata)
        if (finddata.length) {
            return (
                res.status(200).send({
                    status: true,
                    data: finddata,
                    count: finddata.length
                })
            )
        }

        res.status(401).send({
            status: false,
            msg: "data not found"
        })


    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.getsingleCaregiver = async (req, res) => {
    try {
        const { id } = req.params
        const finddata = await Caregiver.findOne({ _id: id })
        if (finddata) {
            return (
                res.status(200).send({
                    status: true,
                    data: finddata
                })
            )
        }

        res.status(400).send({
            status: false,
            msg: "data not found"
        })


    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.deleteCaregiver = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.headers)
        const finddata = await Caregiver.findOne({ _id: id })
        if (finddata) {
            await Caregiver.deleteOne({ _id: id })
            return (
                res.status(200).send({
                    status: true,
                    msg: "Caregiver deleted Successfully"
                })
            )
        }

        res.status(400).send({
            status: false,
            msg: "data not found"
        })


    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.updateCaregiver = async (req, res) => {
    try {
        const { id, agency, agencyEmployeeId, firstName, lastName } = req.params
        const finddata = await Caregiver.findOne({ _id: id })
        if (finddata) {
            const updateCaregiver = await Caregiver.findByIdAndUpdate({ _id: id }, { $set: { agency, agencyEmployeeId, firstName, lastName } })
            if (updateCaregiver) {

                return (
                    res.status(200).send({
                        status: true,
                        msg: "caregiver updated"
                    })
                )
            }
        }

        res.status(400).send({
            status: false,
            msg: "data not found"
        })


    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}
const Agency = require("../../model/agency_model");
const Caregiver = require("../../model/caregiver_model");
const Facility = require("../../model/facility_model");
const Punch = require("../../model/punch_model")

exports.createPunch=async(req,res)=>{
    try {
        const {scanResult,locationId,kioskId,timestamp}=req.body

        const find_facility=await Facility.findOne({locationId})

        if(!find_facility){
            return(
                res.status(200).send({
                    status:true,
                    msg:"No facility found of this locationID"
                })    
            )
        }

        const currentUtcTime = new Date().toUTCString();
        const createPunch= await Punch.create({
            scanResult,locationId,kioskId,timestamp,utcTime:timestamp,punchuser:req.user._id
        })

        if(createPunch){
            res.status(200).send({
                status:true,
                msg:"Punch created"
            })
        }

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.getallPunch=async(req,res)=>{
    try {
        const { startdate, enddate, position, agency,facility_id,emp_search } = req.query
        let filter = {facility_id:facility_id}
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
        

        

        // if (req.user.facility.length == 0) {
        //     return (
        //         res.status(400).send({
        //             status: false,
        //             msg: "data not match your facility"
        //         })
        //     )
        // }



        const finddata = await Punch.find(filter).populate("agency caregiver punchuser facility_id")
        
        const filter_data=finddata.filter((it)=>{
            if(emp_search){
                let regex=new RegExp(emp_search,"i")
                let emp_id= it?.caregiver?.agencyEmployeeId.toString()
                let emp_firstname=it?.caregiver?.firstName.toString()
                let emp_lastname=it?.caregiver?.lastName.toString()
                console.log(regex.test(emp_id) ,regex.test(emp_firstname), regex.test(emp_lastname))
                if(regex.test(emp_id) || regex.test(emp_firstname) || regex.test(emp_lastname)){
                    console.log("enter")
                    return true
                }else{
                    return false
                }

            }else{
                return true
            }
        })




        // console.log(findnewdata)
        if (finddata.length) {
            return (
                res.status(200).send({
                    status: true,
                    data: filter_data,
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

exports.getsinglePunch=async(req,res)=>{
    try {
        const {id}=req.params

        const findpunchs=await Punch.findOne({_id:id}).populate("agency caregiver punchuser facility_id")

        if(findpunchs){
            return(res.status(200).send({
                status:true,
                data:findpunchs
            }))
        }

        res.status(401).send({
            status:false,
            msg:"no data"
        })

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.updatePunch=async(req,res)=>{
    try {
        const {id,caregiver,agency,position,type,utcTime}=req.body

        const findagency = await Agency.findOne({ Id: agency })
        if (!findagency) {
            throw new Error('Agency Not Found');
        }

        const finddata = await Caregiver.findOne({ agencyEmployeeId: caregiver })

        if(finddata){
            
            const findpunchs=await Punch.findOne({_id:id})
    
            if(findpunchs){
                const updatepunch=await Punch.findByIdAndUpdate({_id:id},{$set:{caregiver:finddata?._id,agency:findagency?._id,position,utcTime:convertformatTime(utcTime),type}})
                if(updatepunch){
                    return(res.status(200).send({
                        status:true,
                        msg:"punch updated"
                    }))
                }
            }
        }
        
        const createCaregiver = await Caregiver.create({
            agency: findagency?._id, agencyEmployeeId: caregiver, firstName: "", lastName: ""
        })

        const findpunchs=await Punch.findOne({_id:id})
    
        if(findpunchs){
            const updatepunch=await Punch.findByIdAndUpdate({_id:id},{$set:{caregiver:createCaregiver?._id,agency:findagency?._id,position,utcTime:convertformatTime(utcTime),type}})
            if(updatepunch){
                return(res.status(200).send({
                    status:true,
                    msg:"punch updated"
                }))
            }
        }

        




        res.status(401).send({
            status:false,
            msg:"no data"
        })

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

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
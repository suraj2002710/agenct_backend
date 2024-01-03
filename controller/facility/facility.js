const Company = require("../../model/company_model")
const Facility = require("../../model/facility_model")
const usermodel = require("../../model/user_model")
const { roles_Name } = require("../../permission_constant")

exports.createfacility = async (req, res) => {
    try {
        const { company, name, phone, address, timezone, city, state, locationId } = req.body



        // const finddata=await Facility.find({contactEmail})
        // if(finddata.length){
        //         return(
        //             res.status(401).send({
        //                 status:false,
        //                 msg:"contactEmail already exits"
        //             })
        //         )
        // }

        const create_facility = await Facility.create({
            company, name, phone, address, timezone, city, state, locationId
        })
        console.log(req.user.facility)
        await usermodel.updateOne({ _id: req.user._id }, { $set: { facility: [...req.user.facility, create_facility._id] } })

        if (create_facility) {
            res.status(200).send({
                status: true,
                msg: "Facility created",
                facility:create_facility
            })
        }

    } catch (error) {
        consol
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


exports.getallFacility = async (req, res) => {
    try {
        let roles = req.user.roles.map((it) => it.name)
        let finddata
        if (roles.includes(roles_Name.Company_manger)) {

            finddata = await Facility.find({ company: req?.user?.company })
        }
        if (roles.includes(roles_Name.Admin)) {
            finddata = await Facility.find()
        }
        if (roles.includes(roles_Name.Normal)) {
            finddata = req.user.facility
        }
        
            return (
                res.status(200).send({
                    status: true,
                    data: finddata
                })
            )
        

        


    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


exports.get_facilityby_company = async (req, res) => {
    try {
        const {company_id,name}=req.body
        let company_search=[]
        if(name){
            let find_company=await Company.find({$or:[
                {name:{$regex:name,$options:"i"}}
            ]})
            company_search=find_company.map((it)=>it._id)
        }
        if(company_id){
            company_search.push(company_id)
        }
        console.log(company_search)
        const finddata=await Facility.find({company:{$in:company_search}})
        
            return (
                res.status(200).send({
                    status: true,
                    data: finddata
                })
            )
        
    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}




exports.getsingleFacility = async (req, res) => {
    try {
        const { id } = req.params
        const finddata = await Facility.findOne({ _id: id })
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

exports.deleteFacility = async (req, res) => {
    try {
        const { id } = req.params
        const finddata = await Facility.findOne({ _id: id })
        if (finddata) {
            await Facility.deleteOne({ _id: id })
            return (
                res.status(200).send({
                    status: true,
                    msg: "Facility deleted Successfully"
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
exports.updateFacility = async (req, res) => {
    try {
        const { id, company, name, phone, address, timezone, city, state } = req.params
        const finddata = await Facility.findOne({ _id: id })
        if (finddata) {
            const updateFacility = await Facility.findByIdAndUpdate({ _id: id }, { $set: { company, name, phone, address, timezone, city, state } })
            if (updateFacility) {

                return (
                    res.status(200).send({
                        status: true,
                        msg: "Facility updated"
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

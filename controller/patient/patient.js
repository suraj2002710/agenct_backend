const Patient = require("../../model/Patient_mode. ")

exports.create_patient=async(req,res)=>{
    try{
        const {last_name,first_name}=req.body

        const create_patient=await Patient.create({
            last_name,first_name
        })
        if(create_patient){
            return(res.status(200).send({
                status:true,
                msg:"create patient",
                data:create_patient
            }))
        }

        return(res.status(200).send({
            status:false,
            msg:"patient not create",
        }))


    }catch(err){

        res.status(200).send({
            status:false,
            msg:err.message
        })

    }
}


exports.get_patient=async(req,res)=>{
    try{
        const {search}=req.query
        let filter={}
        console.log("search",search)
        if(search!==undefined && search!==""){
            filter.$or=[
                {first_name:{$regex:search,$options:"i"}},
                {last_name:{$regex:search,$options:"i"}},
            ]
        }
        
        const find_data=await Patient.find(filter)

        if(find_data.length){
            return(res.status(200).send({
                status:true,
                data:find_data
            }))
        }

        return(res.status(200).send({
            status:false,
            msg:"data not found",
        }))

    }catch(err){

        res.status(200).send({
            status:false,
            msg:err.message
        })

    }
}


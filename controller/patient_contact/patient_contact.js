const Patient_contact = require("../../model/patient_contact_model")

exports.create_patient_contact=async(req,res)=>{
    try{
        const {last_name,first_name,relationship,phone,email,patient_id}=req.body

        const create_patient_contact=await Patient_contact.create({
            last_name,first_name,relationship,phone,email,patient_id
        })

        if(create_patient_contact){
            return(res.status(200).send({
                status:true,
                msg:"create patient contact",
                data:create_patient_contact
            }))
        }

        return(res.status(200).send({
            status:false,
            msg:"patient contact not create",
        }))

    }catch(err){

        res.status(200).send({
            status:false,
            msg:err.message
        })

    }
}

exports.get_patient_contact=async(req,res)=>{
    try{
        const {patient_id}=req.params
        const {page,limit}=req.query
        console.log(patient_id)

        const find_data=await Patient_contact.find({
            patient_id:{$in:patient_id.split(",")}
        })

        const count=await Patient_contact.countDocuments({
            patient_id:{$in:patient_id.split(",")}
        })
        if(find_data.length){
            return(res.status(200).send({
                status:true,
                data:find_data,
                count
            }))
        }

        return(res.status(200).send({
            status:false,
            data:find_data,
            msg:"data not found",
        }))

    }catch(err){
        res.status(200).send({
            status:false,
            msg:err.message
        })

    }
}

exports.get_all_patient_contact=async(req,res)=>{
    try{
        const {limit,page}=req.body
        let skip=(page-1)*limit
        const find_data=await Patient_contact.find({unknown:false
        }).limit(limit).skip(skip)
        
        
        
            return(res.status(200).send({
                status:true,
                data:find_data
            }))
        

        

    }catch(err){
        res.status(200).send({
            status:false,
            msg:err.message
        })

    }
}

exports.get_all_unknown_contact=async(req,res)=>{
    try{
        const {limit,page,search}=req.query
        let skip=(page-1)*limit
        let filter={unknown:true}
        if(search){
            filter={
                $or:[
                    {first_name:{$regex:search,$options:"i"}},
                    {last_name:{$regex:search,$options:"i"}},
                ]
            }
        }
        console.log(filter)
        const find_data=await Patient_contact.find(filter).limit(limit).skip(skip)
        console.log(find_data)


        return(res.status(200).send({
            status:false,
            data:find_data
        }))

    }catch(err){
        res.status(200).send({
            status:false,
            msg:err.message
        })

    }
}

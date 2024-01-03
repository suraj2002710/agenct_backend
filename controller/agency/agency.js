const Agency = require("../../model/agency_model")

exports.createAgency=async(req,res)=>{
    try {
        const {name,contactEmail,Id}=req.body

        const finddata=await Agency.find({contactEmail})
        if(finddata.length){
                return(
                    res.status(401).send({
                        status:false,
                        msg:"contactEmail are duplicate"
                    })
                )
        }
        
        const createAgency= await Agency.create({
          Id,
          name,
          contactEmail
        })

        if(createAgency){
            res.status(200).send({
                status:true,
                msg:"Agency created",
                data:createAgency
            })
        }

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}
exports.getAllAgency=async(req,res)=>{
    try {

        const finddata=await Agency.find()
        if(finddata.length){
                return(
                    res.status(200).send({
                        status:true,
                        data:finddata
                    })
                )
        }
        
            res.status(401).send({
                status:false,
                msg:"data not found"
            })
        

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.getsingleAgency=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await Agency.findOne({_id:id})
        if(finddata){
                return(
                    res.status(200).send({
                        status:true,
                        data:finddata
                    })
                )
        }
        
            res.status(401).send({
                status:false,
                msg:"data not found"
            })
        

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.updateAgency=async(req,res)=>{
    try {
        const {id,name,contactEmail}=req.body
        console.log(req.body);
        const finddata=await Agency.findOne({_id:id})
        if(finddata){
            const update_angency=await Agency.findByIdAndUpdate({_id:id},{$set:{name,contactEmail}})
            if(update_angency){

                return(
                    res.status(200).send({
                        status:true,
                        msg:"agency update"
                    })
                    )
                }
        }
        
            res.status(401).send({
                status:false,
                msg:"data not found"
            })
        

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.deleteAgency=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await Agency.findOne({_id:id})
        if(finddata){
            await Agency.deleteOne({_id:id})
                return(
                    res.status(200).send({
                        status:true,
                        msg:"agency deleted"
                    })
                )
        }
            res.status(401).send({
                status:false,
                msg:"data not found"
            })
        

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}
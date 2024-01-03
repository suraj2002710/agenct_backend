const Company = require("../../model/company_model")



exports.createCompany=async(req,res)=>{
    try {
        const {name,address,city,state,zip}=req.body

        const finddata=await Company.find({name})
        if(finddata.length){
                return(
                    res.status(401).send({
                        status:false,
                        msg:"Company Name are duplicate"
                    })
                )
        }
        
        const createCompany= await Company.create({
            name,address,city,state,zip
        })

        if(createCompany){
            res.status(200).send({
                status:true,
                msg:"Company created",createCompany
            })
        }

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.getAllCompany=async(req,res)=>{
    try {
        const finddata=await Company.find()
        if(finddata.length){
                return(
                    res.status(201).send({
                        status:true,
                        data:finddata
                    })
                )
        }
        
            res.status(200).send({
                status:true,
                msg:"data not found"
            })

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.getsingleCompany=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await Company.findOne({_id:id})
        if(finddata){
                return(
                    res.status(201).send({
                        status:true,
                        data:finddata
                    })
                )
        }
        
            res.status(200).send({
                status:true,
                msg:"data not found"
            })

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.deleteCompany=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await Company.findOne({_id:id})
        if(finddata){
            await Company.deleteOne({_id:id})
                return(
                    res.status(201).send({
                        status:true,
                        msg:"Company deleted"
                    })
                )
        }
        
            res.status(200).send({
                status:true,
                msg:"data not found"
            })

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.updateCompany=async(req,res)=>{
    try {
        const {id,name,address,city,state,zip}=req.body
        const finddata=await Company.findOne({_id:id})
        if(finddata){
           const updateCompanySet =await Company.findByIdAndUpdate({_id:id},{$set:{name,address,city,state,zip}})
           if(updateCompanySet){

               return(
                   res.status(201).send({
                       status:true,
                       msg:"Company updated"
                    })
                    )
                }
        }
        
            res.status(200).send({
                status:true,
                msg:"data not found"
            })

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}
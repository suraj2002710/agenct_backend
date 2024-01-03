const Permission = require("../../model/permission_model")
const PermissionSet = require("../../model/permission_set_model")
const { permissionSet_Create } = require("../../permission_sets_script")

exports.createPermissionSet=async(req,res)=>{
    try {
        const {name,company,permissions}=req.body

        const finddata=await PermissionSet.find({name})
        if(finddata.length){
                return(
                    res.status(401).send({
                        status:false,
                        msg:"PermissionSet Name are duplicate"
                    })
                )
        }
        
        const createPermissionSet= await PermissionSet.create({
            name,company,permissions
        })

        if(createPermissionSet){
            res.status(200).send({
                status:true,
                msg:"PermissionSet created",PermissionSet
            })
        }

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.getAllPermissionSet=async(req,res)=>{
    try {
        const finddata=await PermissionSet.find()
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

exports.getsinglePermissionSet=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await PermissionSet.findOne({_id:id})
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

exports.deletePermissionSet=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await PermissionSet.findOne({_id:id})
        if(finddata){
            await PermissionSet.deleteOne({_id:id})
                return(
                    res.status(201).send({
                        status:true,
                        msg:"PermissionSet deleted"
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

exports.updatePermissionSet=async(req,res)=>{
    try {
        const {id,name,company,permissions}=req.body
        const finddata=await PermissionSet.findOne({_id:id})
        if(finddata){
           const updatePermissionSet =await PermissionSet.findByIdAndUpdate({_id:id},{$set:{name,company,permissions}})
           if(updatePermissionSet){

               return(
                   res.status(201).send({
                       status:true,
                       msg:"PermissionSet updated"
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

exports.Create_defualt_permission_set=async(req,res)=>{
    try {
        const { pass } = req.params
        let password = "admin"
        
        console.log(pass)

        if (password == pass) {
            
            for (const it of permissionSet_Create) {
            
                const find_permission = await PermissionSet.findOne({ name: it.name })
                
                if (find_permission) {
                    console.log(find_permission)
                    
                }else{
                    const find_permissions=await Permission.find({name:{$in:it.permission_name}})
                    const ids=find_permissions.map((it)=>it._id)
                    await PermissionSet.create({
                        name: it.name,
                        permissions:ids,
                        company:it.company
                    })
                }
            }
            res.status(201).send({
                msg: "all permissions are create"
            })
        }
    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}
const { roles_Create } = require("../../Roles_script")
const PermissionSet = require("../../model/permission_set_model")
const Role = require("../../model/role_model")


exports.createRole=async(req,res)=>{
    try {
        const {name,company,permissionSets}=req.body

        const finddata=await Role.find({name})
        if(finddata.length){
                return(
                    res.status(401).send({
                        status:false,
                        msg:"role Name are already exit"
                    })
                )
        }
        
        const createRole= await Role.create({
            name,company,permissionSets
        })

        if(createRole){
            res.status(200).send({
                status:true,
                msg:"Role created",data:createRole
            })
        }

    } catch (error) {
        res.status(500).send({
            status:false,
            msg:error.message
        })
    }
}

exports.getAllRole=async(req,res)=>{
    try {
        const finddata=await Role.find()
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

exports.getsingleRole=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await Role.findOne({_id:id})
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

exports.deleteRole=async(req,res)=>{
    try {
        const {id}=req.params
        const finddata=await Role.findOne({_id:id})
        if(finddata){
            await Role.deleteOne({_id:id})
                return(
                    res.status(201).send({
                        status:true,
                        msg:"Role deleted"
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

exports.updateRole=async(req,res)=>{
    try {
        const {id,name,company,permissionSets}=req.body
        const finddata=await Role.findOne({_id:id})
        if(finddata){
           const updateRole =await Role.findByIdAndUpdate({_id:id},{$set:{name,company,permissionSets}})
           if(updateRole){

               return(
                   res.status(201).send({
                       status:true,
                       msg:"Role updated"
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


exports.Create_defualt_roles=async(req,res)=>{
    try {
        const { pass } = req.params
        let password = "admin"
        
        console.log(pass)

        if (password == pass) {
            
            for (const it of roles_Create) {
            
                const find_permission = await Role.findOne({ name: it.name })
                
                if (find_permission) {
                    console.log(find_permission)
                    
                }else{
                    const find_permissionsets=await PermissionSet.find({name:{$in:it.permissionSet_name}})
                    console.log("find_permissionsets",find_permissionsets)
                    const ids=find_permissionsets.map((it)=>it._id)
                    await Role.create({
                        name: it.name,
                        permissionSets:ids,
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
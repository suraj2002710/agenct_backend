const jwt=require('jsonwebtoken')
const usermodel = require('../../model/user_model')

exports.authentication=async(req)=>{
    try {
        const token=req.headers.authorization
        if(!token){
            return null
        }

        const decode=await jwt.verify(token,process.env.JWT_SCRETE_KEY)
        const finduser=await usermodel.findOne({_id:decode.id})
        if(finduser){
            req.user=finduser
            return finduser
        }

        return null

    } catch (error) {
        return null
    }
}

exports.authentication_for_restapi=async(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return(res.status(400).send({
                status:false,
                msg:"token not found"
            }))
        }

        const decode=await jwt.verify(token,process.env.JWT_SCRETE_KEY)
        console.log(decode)
        const finduser=await usermodel.findOne({_id:decode.id}).populate({path:"roles",model:"Role",select:"name permissionSets",populate:{path:"permissionSets",select:"permissions",populate:{path:"permissions",select:"name"}}}).populate("facility")

        const userPermissions =finduser.roles.reduce((permissions, role) => {
            const rolePermissions = role.permissionSets.reduce((perms, permSet) => {
                
              perms = perms.concat(permSet.permissions.map(p => p.name.toString()));
              return perms;
            }, []);
            console.log(rolePermissions)
            permissions = permissions.concat(rolePermissions);
            return permissions;
          }, []);
          console.log(finduser)
        if(finduser){
            req.user=finduser
            console.log("next")
           return next()
            
        }


        return(res.status(400).send({
                status:false,
                msg:"user not found"
            }))

    } catch (error) {
        console.log(error)
        res.status(500).send({
            error_code:403,
            status:false,
            msg:error.message
        })
    }
}
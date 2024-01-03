
exports.checkpermission=(permission)=>{
   return async(req,res,next)=>{
        try {
          
            const user=req.user
            // console.log(user.roles)
            const userPermissions = user.roles.reduce((permissions, role) => {
                const rolePermissions = role.permissionSets.reduce((perms, permSet) => {
                  perms = perms.concat(permSet.permissions.map(p => p.name.toString()));
                  return perms;
                }, []);
                permissions = permissions.concat(rolePermissions);
                return permissions;
              }, []);
          
              const hasPermission = permission.every((perm) =>
              userPermissions.includes(perm?.toString())
              );
              console.log(userPermissions,permission,hasPermission);
              
    if (hasPermission) {
        next();
      } else {
        res.status(403).json({ message: "you are not authorized for this operation" });
      }
        } catch (error) {
          console.log(error)
            res.status(501).send({
                status:false,
                msg:error.message
            })
        }
    }
}
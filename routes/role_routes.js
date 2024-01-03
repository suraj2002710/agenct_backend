const { createRole, getsingleRole, getAllRole, deleteRole, updateRole } = require('../controller/role/role')
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')
const { checkpermission } = require('../middleware/checkpermission')
const { permissionName } = require('../permission_constant')

const router=require('express').Router()


router.route('/create').post(authentication_for_restapi,checkpermission([permissionName.create_role]),createRole)
router.route('/single-fetch/:id').get(authentication_for_restapi,checkpermission([permissionName.single_fetch_role]),getsingleRole)
router.route('/fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_role]),getAllRole)
router.route('/delete/:id').delete(authentication_for_restapi,checkpermission([permissionName.delete_role]),deleteRole)
router.route('/update').put(authentication_for_restapi,checkpermission([permissionName.update_role]),updateRole)



module.exports=router 
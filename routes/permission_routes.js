const { createPermission, getAllPermission, deletePermission, updatePermission, getsinglePermission, create_all_permission } = require('../controller/permission/permission')
const { createPermissionSet, getAllPermissionSet, getsinglePermissionSet, deletePermissionSet, updatePermissionSet, Create_defualt_permission_set } = require('../controller/permission/permission_set')
const { Create_defualt_roles } = require('../controller/role/role')
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')
const { checkpermission } = require('../middleware/checkpermission')
const { permissionName } = require('../permission_constant')

const router=require('express').Router()


router.route('/permission-set-create').post(authentication_for_restapi,checkpermission([permissionName.create_permission_set]),createPermissionSet)
router.route('/permission-set-single-fetch/:id').get(authentication_for_restapi,checkpermission([permissionName.single_fetch_permission_set]),getsinglePermissionSet)
router.route('/permission-set-fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_permission_set]),getAllPermissionSet)
router.route('/permission-set-delete/:id').delete(authentication_for_restapi,checkpermission([permissionName.delete_permission_set]),deletePermissionSet)
router.route('/permission-set-update').put(authentication_for_restapi,checkpermission([permissionName.update_permission_set]),updatePermissionSet)

router.route('/permission-create').post(authentication_for_restapi,checkpermission([permissionName.create_permission]),createPermission)
router.route('/permission-single-fetch/:id').get(authentication_for_restapi,checkpermission([permissionName.single_fetch_permission]),getsinglePermission)
router.route('/permission-fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_permission]),getAllPermission)
router.route('/permission-delete/:id').delete(authentication_for_restapi,checkpermission([permissionName.delete_permission]),deletePermission)
router.route('/permission-update').put(authentication_for_restapi,checkpermission([permissionName.update_permission]),updatePermission)
router.route('/permission-create-all/:pass').get(create_all_permission)
router.route('/permissionsets-create-all/:pass').get(Create_defualt_permission_set)
router.route('/role-create-all/:pass').get(Create_defualt_roles)



module.exports=router 
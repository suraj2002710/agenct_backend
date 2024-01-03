const { createAgency, getsingleAgency, getAllAgency, deleteAgency, updateAgency } = require('../controller/agency/agency')
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')
const { checkpermission } = require('../middleware/checkpermission')
const { permissionName } = require('../permission_constant')

const router=require('express').Router()


router.route('/create').post(authentication_for_restapi,checkpermission([permissionName.create_agency]),createAgency)
router.route('/single-fetch/:id').get(authentication_for_restapi,checkpermission([permissionName.single_fetch_agency]),getsingleAgency)
router.route('/fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_agency]),getAllAgency)
router.route('/delete/:id').delete(authentication_for_restapi,checkpermission([permissionName.delete_agency]),deleteAgency)
router.route('/update').put(authentication_for_restapi,checkpermission([permissionName.update_agency]),updateAgency)



module.exports=router 
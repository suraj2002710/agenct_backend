const { createCaregiver, getsingleCaregiver, getallCaregiver, deleteCaregiver, updateCaregiver } = require('../controller/caregiver/caregiver')

const router=require('express').Router()
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')
const { checkpermission } = require('../middleware/checkpermission')
const { permissionName } = require('../permission_constant')


// checkpermission([permissionName.create_puch_caregiver])
router.route('/punch').post(authentication_for_restapi,checkpermission([permissionName.create_punch_caregiver]),createCaregiver)
router.route('/single-fetch/:id').get(authentication_for_restapi,checkpermission([permissionName.single_fetch_caregiver]),getsingleCaregiver)
router.route('/fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_caregiver]),getallCaregiver)
router.route('/delete/:id').delete(authentication_for_restapi,checkpermission([permissionName.delete_caregiver]),deleteCaregiver)
router.route('/update').put(authentication_for_restapi,checkpermission([permissionName.update_caregiver]),updateCaregiver)



module.exports=router 
const { createfacility, getsingleFacility, getallFacility, deleteFacility, updateFacility, get_facilityby_company } = require('../controller/facility/facility')

const router=require('express').Router()
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')
const { checkpermission } = require('../middleware/checkpermission')
const { permissionName } = require('../permission_constant')

router.route('/create').post(authentication_for_restapi,checkpermission([permissionName.create_facility]),createfacility)
router.route('/single-fetch/:id').get(authentication_for_restapi,checkpermission([permissionName.single_fetch_facility]),getsingleFacility)
router.route('/fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_facility]),getallFacility)

router.route('/fetch-by-company').post(authentication_for_restapi,checkpermission([permissionName.fetch_facility_by_company]),get_facilityby_company)

router.route('/delete/:id').delete(authentication_for_restapi,checkpermission([permissionName.delete_facility]),deleteFacility)
router.route('/update').put(authentication_for_restapi,checkpermission([permissionName.update_facility]),updateFacility)



module.exports=router 
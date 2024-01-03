const { createCompany, getsingleCompany, getAllCompany, deleteCompany, updateCompany } = require('../controller/company/company')

const router=require('express').Router()
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')
const { checkpermission } = require('../middleware/checkpermission')
const { permissionName } = require('../permission_constant')

router.route('/create').post(authentication_for_restapi,checkpermission([permissionName.create_company]),createCompany)
router.route('/single-fetch/:id').get(authentication_for_restapi,checkpermission([permissionName.single_fetch_company]),getsingleCompany)
router.route('/fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_company]),getAllCompany)
router.route('/delete/:id').delete(authentication_for_restapi,checkpermission([permissionName.delete_company]),deleteCompany)
router.route('/update').put(authentication_for_restapi,checkpermission([permissionName.update_company]),updateCompany)



module.exports=router 
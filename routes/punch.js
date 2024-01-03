const { createPunch, getsinglePunch, getallPunch, updatePunch } = require('../controller/punch/punch')
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')
const { checkpermission } = require('../middleware/checkpermission')
const { permissionName } = require('../permission_constant')
const router=require('express').Router()


router.route('/create').post(authentication_for_restapi,createPunch)
router.route('/single-fetch/:id').get(authentication_for_restapi,getsinglePunch)
router.route('/fetch-all').get(authentication_for_restapi,checkpermission([permissionName.fetch_all_punch]),getallPunch)
// router.route('/delete/:id').delete()
router.route('/update').put(authentication_for_restapi,updatePunch)



module.exports=router 
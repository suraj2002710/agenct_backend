const { sinup, login, get_signle_user, assignrole, assignfacility } = require('../controller/users/users')
const {  authentication_for_restapi } = require('../middleware/authentication/jwtauth')

const router=require('express').Router()
router.route('/signup').post(sinup)
router.route('/login').post(login)
router.route('/get-single-user').get(authentication_for_restapi,get_signle_user)
router.route('/role-assign').post(authentication_for_restapi,assignrole)
router.route('/facility-assign').post(authentication_for_restapi,assignfacility)



module.exports=router 
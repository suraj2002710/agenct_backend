const { create_group, get_group, get_all_chats } = require('../controller/messages/chatgroup_controller')
const { create_messages, get_messages, fetch_messages_from_tiwlio, fetch_new_messages, read_msg } = require('../controller/messages/messages_controller')
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')

const router=require('express').Router()

router.post("/create",create_messages)
// router.post("/fetch-messages-tiwlio",fetch_messages_from_tiwlio)
router.post("/fetch",authentication_for_restapi,get_messages)
router.get("/fetch-new-messages",authentication_for_restapi,fetch_new_messages)
router.post("/group-create",authentication_for_restapi,create_group)
router.get("/group-fetch-all",authentication_for_restapi,get_group)
router.post("/get-all-chats",authentication_for_restapi,get_all_chats)
router.post("/msg-read",authentication_for_restapi,read_msg)


module.exports=router
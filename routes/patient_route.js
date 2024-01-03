const { create_patient, get_patient } = require('../controller/patient/patient')
const { create_patient_contact, get_patient_contact, get_all_patient_contact, get_all_unknown_contact } = require('../controller/patient_contact/patient_contact')
const { authentication_for_restapi } = require('../middleware/authentication/jwtauth')

const router=require('express').Router()

router.post("/create",authentication_for_restapi,create_patient)
router.get("/fetch-all",authentication_for_restapi,get_patient)
router.post("/patient_contact/create",authentication_for_restapi,create_patient_contact)
router.get("/get-unknown-contact",authentication_for_restapi,get_all_unknown_contact)
router.get("/patient_contact/fetch/:patient_id",authentication_for_restapi,get_patient_contact)
router.post("/patient_contact/fetch-all/",authentication_for_restapi,get_all_patient_contact)



module.exports=router 
const usermodel = require("../../model/user_model")
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
exports.sinup = async (req, res) => {
    try {
        
        const { first_name, last_name, email, password, phone } = req.body
        const hashpwrd = await bcrypt.hash(password, 12)

        const finduser=await usermodel.findOne({email})
        if(finduser){
            return (
                res.status(500).send({
                    status: false,
                    msg: "thie email is already exits"
                })
            )
        }

        if (!password) {
            return (
                res.status(500).send({
                    status: false,
                    msg: "password are required"
                })
            )
        }

        const create_user = await usermodel.create({
            first_name, last_name, email, password: hashpwrd, phone
        })
        if (create_user) {
            const token = await jwt.sign({ id: create_user._id }, process.env.JWT_SCRETE_KEY, {
                expiresIn: '1d'
            })
            res.status(200).send({
                status: true,
                msg: "user created",
                token:token
            })
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {  email, password } = req.body
        console.log(password)
        const find_user=await usermodel.findOne({email}).populate("facility").populate({path:"roles",model:"Role",select:"name"})
        if (!password) {
            return (
                res.status(500).send({
                    status: false,
                    msg: "Password are Required"
                })
                )
            }
        if(find_user){
            
            const comparePassword = await bcrypt.compare(password, find_user.password)
            if (!comparePassword) {
                return (
                    res.status(200).send({
                        status: false,
                        msg: "Password Do Not Match"
                    })
                )
            } else {
                const token = await jwt.sign({ id: find_user._id }, process.env.JWT_SCRETE_KEY, {
                    expiresIn: '1d'
                })
                return(res.status(200).send({
                    status: true,
                    msg: "you are login successfully",
                    token,
                    findUser:find_user
                }))
            }
        }
            res.status(200).send({
                status: false,
                msg: "User Not Found"
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.assignrole = async (req, res) => {
    try {
        const {  roleid,userid } = req.body
        const find_user=await usermodel.findOne({_id:userid})
        if(find_user){
            
            const update=await usermodel.updateOne({_id:userid},{$set:{roles:roleid}})
            if(update){
                return(res.status(200).send({
                    status: true,
                    msg: "roles assing"
                }))        
            }
        }
        res.status(400).send({
            status: false,
            msg: "user not found"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.assignfacility = async (req, res) => {
    try {
        const {  facility,userid } = req.body
        const find_user=await usermodel.findOne({_id:userid})
        if(find_user){
            
            const update=await usermodel.updateOne({_id:userid},{$set:{facility:facility}})
            if(update){
                return(res.status(200).send({
                    status: true,
                    msg: "facility assing"
                }))        
            }
        }
        res.status(400).send({
            status: false,
            msg: "User Not Found"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.get_signle_user = async (req, res) => {
    try {
        const find_user=await usermodel.findOne({_id:req.user._id}).populate("facility").populate({path:"roles",model:"Role",select:"name"})
        
        if(find_user){
            return(res.status(200).send({
                status: true,
                findUser:find_user
            }))
        }
            res.status(200).send({
                status: false,
                msg: "user not found"
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}
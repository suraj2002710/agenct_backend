const Permission = require("../../model/permission_model")
const { permission_Create } = require('../../permission_script')  // import for premission creation
exports.createPermission = async (req, res) => {
    try {
        const { name, description, route } = req.body

        const finddata = await Permission.find({ name })
        if (finddata.length) {
            return (
                res.status(401).send({
                    status: false,
                    msg: "Permission Name are duplicate"
                })
            )
        }

        const createPermission = await Permission.create({
            name, description, route
        })

        if (createPermission) {
            res.status(200).send({
                status: true,
                msg: "Permission created"
            })
        }

    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.getAllPermission = async (req, res) => {
    try {
        const finddata = await Permission.find()
        if (finddata.length) {
            return (
                res.status(201).send({
                    status: true,
                    data: finddata
                })
            )
        }

        res.status(200).send({
            status: true,
            msg: "data not found"
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.getsinglePermission = async (req, res) => {
    try {
        const { id } = req.params
        const finddata = await Permission.findOne({ _id: id })
        if (finddata) {
            return (
                res.status(201).send({
                    status: true,
                    data: finddata
                })
            )
        }

        res.status(200).send({
            status: true,
            msg: "data not found"
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.deletePermission = async (req, res) => {
    try {
        const { id } = req.params
        const finddata = await Permission.findOne({ _id: id })
        if (finddata) {
            await Permission.deleteOne({ _id: id })
            return (
                res.status(201).send({
                    status: true,
                    msg: "Permission deleted"
                })
            )
        }

        res.status(200).send({
            status: true,
            msg: "data not found"
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}

exports.updatePermission = async (req, res) => {
    try {
        const { id, name, description, route } = req.body
        const finddata = await Permission.findOne({ _id: id })
        if (finddata) {
            const updatePermission = await Permission.findByIdAndUpdate({ _id: id }, { $set: { name, description, route } })
            if (updatePermission) {

                return (
                    res.status(201).send({
                        status: true,
                        msg: "Permission updated"
                    })
                )
            }
        }

        res.status(200).send({
            status: true,
            msg: "data not found"
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            msg: error.message
        })
    }
}


exports.create_all_permission = async (req, res) => {

    try {
        const { pass } = req.params
        let password = "admin"
        
        console.log(pass)

        if (password == pass) {
            
            for (const it of permission_Create) {
            
                const find_permission = await Permission.findOne({ name: it.name })
                
                if (find_permission) {
                    console.log(find_permission)
                    
                }else{

                    await Permission.create({
                        name: it?.name,
                        description: it?.description,
                        route: it?.route
                    })
                }
            }
            res.status(201).send({
                msg: "all permissions are create"
            })
        } else {
            res.status(501).send({
                msg: "wrong password"
            })
        }

    } catch (error) {
        console.log(error)
        res.status(501).send({
            msg: error.message
        })
    }

}
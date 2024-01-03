const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    first_name:{
        type:String,
    },
    last_name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    phone:{
        type:String,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"company"
    },
    facility:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Facility"}]
    },
    permissionsAssigned: Boolean,
    roles:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Role"}]
    },
    addintional_permission:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Permission"}]
    },
    revok_permission:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:"Permission"}]
    },
    provider:{
        type:String
    },
    id:{
        type:String
    },
    is_subscriptable_agency_tracking:{
        type:Boolean,
        default:false
    },
    is_subscriptable_text:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const usermodel=new mongoose.model("users",schema)

module.exports=usermodel
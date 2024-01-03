const mongoose=require('mongoose')

exports.connection=()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL).then((res)=>{
            console.log("mongo connect")
        }).catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        
    }
}
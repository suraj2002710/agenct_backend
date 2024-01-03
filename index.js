const express=require('express')
const app=express()
require('dotenv').config()
const {ApolloServer,gql}=require("apollo-server-express")
const mongoose=require("mongoose")
const { connection } = require('./db/conection')
const authrouter = require('./routes/auth_route')
const cookies_session=require('express-session')
const swaggerUi = require('swagger-ui-express');
const specs = require('./swager_docs'); 
const userRouter=require('./routes/users_routes')
const agencyRouter=require('./routes/agency_routes')
const caregiverRouter=require("./routes/caregiver_route")
const CaregivertypDef=require("./controller/caregiver/caregiver.typedef")
const CaregiverResolver=require("./controller/caregiver/caregiver.resolver")
const { authentication } = require('./middleware/authentication/jwtauth')
const permissionRouter=require("./routes/permission_routes")
const roleRouter=require('./routes/role_routes')
const companyRouter=require('./routes/company_routes')
const FacilityRouter=require("./routes/facility_routes")
const Punch_router=require("./routes/punch")
const Patient_router=require("./routes/patient_route")
const message_router=require("./routes/messages_route")
const cors=require("cors")
const twilio = require('twilio');
const Messages = require('./model/messages_mode')
const Patient_contact = require('./model/patient_contact_model')
const accountSid = 'ACc51b81984c2040944d0be33bab6e44bb';
const authToken = '2352d5ddd3eed47b732d4c0fa21d837a';

const client = twilio(accountSid, authToken);
const from = '+19735592976'
const to = '+918233812107'; // Recipient's phone number
client.messages
  .create({
    body: 'Hello, this is a test message from Twilio!',
    from: from,
    to: to
  })
  .then(message => console.log(`Message sent with SID: ${message.sid}`))
  .catch(error => console.error(`Error sending message: ${error.message}`));
let port=process.env.PORT
app.use(cookies_session(
    {
        resave: true,
        saveUninitialized: false,
        secret: "sdhfkhjfdsjklahfkdsajhf",
    }
))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
  app.use(cors({
    origin:"*"
  }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/user',userRouter)
app.use('/api/agency',agencyRouter)
app.use('/api/caregiver',caregiverRouter)
app.use('/api/permission',permissionRouter)
app.use('/api/role',roleRouter)
app.use('/api/company',companyRouter)
app.use('/api/facility',FacilityRouter)
app.use('/api/Punch',Punch_router)
app.use('/api/patient',Patient_router)
app.use('/api/message',message_router)
app.use(authrouter)
connection()
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
  },
};


const startserver=async()=>{
  const apoloserver=new ApolloServer({typeDefs:CaregivertypDef,resolvers:CaregiverResolver,context:async({req})=>{
    
    let token=req.headers["token"]
     const user= await authentication(req)
    return {user}
  }})
  await apoloserver.start()
  apoloserver.applyMiddleware({app})
}
startserver()

const server= app.listen(port,()=>{
  console.log("server started",port)
})

const io = require('socket.io')(server, {
  cors: {
      origin: "*"
  }
})


app.post("/api/message/fetch-messages-tiwlio",async(req,res)=>{
  try {
    const { phone, message } = req.body
    let create_contact
    let msg_create
            
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
    const currentDay = currentDate.getDate();

    const find_contact = await Patient_contact.findOne({ phone: phone })
    let create_messages
    if (find_contact) {
        await Messages.create({
          
            Type: "inbound", Method: "single", messages:message, Patient_contact: find_contact._id
        })

                
        const grouping1 = await Messages.aggregate([
          {
              $match: {
                  Patient_contact: new mongoose.Types.ObjectId(find_contact._id),
                  createdAt: {
                      $gte: new Date(currentYear, currentMonth - 1, currentDay), // Subtract 1 from the month since it's 0-indexed
                      $lt: new Date(currentYear, currentMonth - 1, currentDay + 1),
                  },
              },
          },
          {
              $group: {
                  _id: {
                      year: { $year: '$createdAt' },
                      month: { $month: '$createdAt' },
                      day: { $dayOfMonth: '$createdAt' },
                  },
                  messages: { $push: '$$ROOT' },
              },
          },
          {
              $sort: {
                  '_id.year': 1,
                  '_id.month': 1,
                  '_id.day': 1,
              },
          },
      ])


        io.emit("msg-send",{sender_id:find_contact._id,msg:grouping1})
    }
    else {
        let create_contact=await Patient_contact.create({ 
            last_name:"",first_name:"",relationship:"",phone,email:"" ,unknown:true})
      msg_create= await Messages.create({
            Type: "inbound", Method: "single", messages:message,Patient_contact:create_contact._id
        })



        const grouping1 = await Messages.aggregate([
            {
                $match: {
                    Patient_contact: new mongoose.Types.ObjectId(create_contact._id),
                    createdAt: {
                        $gte: new Date(currentYear, currentMonth - 1, currentDay), // Subtract 1 from the month since it's 0-indexed
                        $lt: new Date(currentYear, currentMonth - 1, currentDay + 1),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' },
                        day: { $dayOfMonth: '$createdAt' },
                    },
                    messages: { $push: '$$ROOT' },
                },
            },
            {
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                    '_id.day': 1,
                },
            },
        ])




        io.emit("msg-send",{sender_id:create_contact._id,msg:grouping1})
    }

    
  
  return (res.status(200).send({
      status: true,
      msg: "create message",
      data:{msg:msg_create,contact:create_contact}
  }))




} catch (err) {
console.log(err)
    res.status(500).send({
        status: false,
        msg: err.message
    })

}
})

let socket_variable=io
// console.log(socket_variable)
io.on("connection",(socket)=>{
  console.log("connected")
  socket_variable=socket
  // io.emit("msg-send","sdfhsdhfj")
})

module.exports=socket_variable
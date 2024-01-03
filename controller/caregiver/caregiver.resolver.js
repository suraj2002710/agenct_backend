const Agency = require("../../model/agency_model");
const Caregiver = require("../../model/caregiver_model")
const Punch=require("../../model/punch_model")
const convertformatTime = (inputDateTime) => {

    // Parse the input date and time string
    const year = inputDateTime.slice(0, 4);
    const month = inputDateTime.slice(4, 6);
    const day = inputDateTime.slice(6, 8);
    const hours = inputDateTime.slice(8, 10);
    const minutes = inputDateTime.slice(10, 12);
    const ampm = inputDateTime.slice(12).toLowerCase();

    // Determine if it's AM or PM
    let period = "AM";
    if (ampm === "pm" && hours !== "12") {
        period = "PM";
    } else if (ampm === "am" && hours === "12") {
        hours = "00"; // Convert 12:XX AM to 00:XX AM
    }

    // Create the formatted date and time string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes} ${period}`;

    return formattedDateTime

}

const resolver = {
    Query: {
        getallCaregiver: async () => {
            console.log("suraj");
            const data = await Caregiver.find()
            return data
        }
    },
    Mutation: {
        createCaregiver: async (parent, args, context, info) => {
            console.log(context);
            let input = args?.Caregiver?.punch?.split('-')
            try {

                

                console.log(context.user);
                if(context.user==null){
                    throw new Error('you are not authenticate user');                    
                }
                const findagency=await Agency.findOne({Id:input[0]})
                if(!findagency){
                    throw new Error('Agency Not Found');                    
                }
                const finddata = await Caregiver.findOne({ agencyEmployeeId: input[1] })
                if (finddata) {
                    throw new Error('Agency already exit');                    
                }
                const createCaregiver = await Caregiver.create({
                    agency: findagency._id, agencyEmployeeId: input[1], firstName: "", lastName: ""
                })
                
                

                console.log(createCaregiver);
                if (createCaregiver) {
                    const createpunch=await Punch.create({
                        caregiver:createCaregiver?._id,
                        agency:findagency._id,position:input[2],utcTime:convertformatTime(input[4]),
                      type:input[3]  
                    })
                    return (
                        createCaregiver
                    )

                }

            } catch (error) {
                
                return error
            }
        }
    }
}
module.exports = resolver
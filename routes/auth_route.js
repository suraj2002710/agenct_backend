const router=require('express').Router()
const facebook_passport=require("../middleware/authentication/facebook_auth")
const passport=require('../middleware/authentication/google_auth')
const microsoft_passport=require("../middleware/authentication/microsoft_auth")
const jwt=require("jsonwebtoken")
const usermodel = require('../model/user_model')
router.get('/google',

  passport.authenticate('google', {  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/user.phonenumbers.read',
    'https://www.googleapis.com/auth/user.addresses.read',
    'https://www.googleapis.com/auth/profile.agerange.read'
] }));

  router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect:  process.env.FAILUREURL }),
  async(req, res) => {
    console.log("req.user",req.user)

    const finduser=await usermodel.findOne({id:req.user?.id})

    if(!finduser){

          const userdata=await usermodel.create({
        first_name:req.user.name.givenName,
        last_name:req.user.name.familyName,
        email:req.user.emails[0].value,
        provider:"google"
    })
      let token=await jwt.sign({id:userdata._id},process.env.JWT_SCRETE_KEY, {
        expiresIn: '1d'
    })
    console.log(token)
      return res.redirect(`${process.env.SUCCESSURL}?token=${token}`);
      
  }

  let token=await jwt.sign({id:finduser._id},process.env.JWT_SCRETE_KEY, {
    expiresIn: '1d'
})

    // Successful authentication, redirect to a success page or perform further actions.
    res.redirect(`${process.env.SUCCESSURL}?token=${token}`);
  });

router.get('/auth/facebook',facebook_passport.authenticate('facebook'))

router.get('/auth/facebook/callback',facebook_passport.authenticate('facebook',{failureRedirect:process.env.FAILUREURL}),
async(req, res) => {
  console.log("req.user",req.user)

  const finduser=await usermodel.findOne({id:req.user?.id})

    if(!finduser){

      const userdata=await usermodel.create({
          first_name:req.user?.displayName.split(" ")[0],
          last_name:req.user.name.familyName,
          id:req.user.id,
          provider:"facebook"
      })
      let token=await jwt.sign({id:userdata._id},process.env.JWT_SCRETE_KEY, {
        expiresIn: '1d'
    })
    console.log(token)
      return res.redirect(`${process.env.SUCCESSURL}?token=${token}`);
      
  }

  let token=await jwt.sign({id:finduser._id},process.env.JWT_SCRETE_KEY, {
    expiresIn: '1d'
})

    // Successful authentication, redirect to a success page or perform further actions.
    res.redirect(`${process.env.SUCCESSURL}?token=${token}`);




  // Successful authentication, redirect to a success page or perform further actions.
  
})


// Define routes for authentication
router.get('/auth/microsoft',
  microsoft_passport.authenticate('microsoft', {
    scope: ['user.read'], // Add required permissions
  })
);

router.get('/auth/microsoft/callback',
  microsoft_passport.authenticate('microsoft', {
    failureRedirect: process.env.FAILUREURL,
  }),
  async(req, res) => {
    console.log("req.user",req.user)

    const finduser=await usermodel.findOne({id:req.user?.id})

    if(!finduser){

      const userdata=await usermodel.create({
        first_name:req.user?.name.givenName,
        last_name:req.user?.name.familyName,
        email:req.user?.mail,
        id:req.user?.id,
        provider:"microsoft"
    })
      let token=await jwt.sign({id:userdata._id},process.env.JWT_SCRETE_KEY, {
        expiresIn: '1d'
    })
    console.log(token)
      return res.redirect(`${process.env.SUCCESSURL}?token=${token}`);
      
  }

  let token=await jwt.sign({id:finduser._id},process.env.JWT_SCRETE_KEY, {
    expiresIn: '1d'
})

    // Successful authentication, redirect to a success page or perform further actions.
    res.redirect(`${process.env.SUCCESSURL}?token=${token}`);


  }
);

module.exports=router 
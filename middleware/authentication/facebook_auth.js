const passport=require('passport')
const FacebookStrategy=require('passport-facebook').Strategy
const usermodel = require("../../model/user_model");
passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    // enableProof: true
  },
  async function(accessToken, refreshToken, profile, cb) {
  
    console.log('====================================');
    console.log(profile);
    console.log('====================================');
  //   const finduser=await usermodel.findOne({id:profile?.id})

  //   if(!finduser){

  //     const userdata=await usermodel.create({
  //         first_name:profile?.displayName.split(" ")[0],
  //         last_name:profile.name.familyName,
  //         id:profile.id,
  //         provider:"facebook"
  //     })
      
  // }

      return cb(null, profile);
 
  }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((user, cb) => {
    cb(null, user);
  });

  module.exports=passport
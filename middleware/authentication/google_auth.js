
const passport = require("passport");
const usermodel = require("../../model/user_model");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope:['displayName']
    },
    async function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
// const finduser=await usermodel.findOne({email:profile?.emails[0]?.value})

// if(!finduser){

//     const userdata=await usermodel.create({
//         first_name:profile.name.givenName,
//         last_name:profile.name.familyName,
//         email:profile.emails[0].value,
//         provider:"google"
//     })
    
// }
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
module.exports = passport;
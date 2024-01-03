const express = require('express');
const passport = require('passport');
const MicrosoftStrategy = require('passport-microsoft').Strategy;
const usermodel = require("../../model/user_model");
const app = express();

// Replace with your App Registration info

passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_SECRET_ID,
  callbackURL: process.env.MICROSOFT_CALLBACK,
},
async (accessToken, refreshToken, profile, done) => {
  // You can access user information in the 'profile' object.
  // You can create or update a user record in your database here.
  console.log(profile)

  const finduser=await usermodel.findOne({id:profile?.id})

    if(!finduser){

      const userdata=await usermodel.create({
          first_name:profile?.name.givenName,
          last_name:profile?.name.familyName,
          email:profile?.mail,
          id:profile?.id,
          provider:"microsoft"
      })
    }


  return done(null, profile);
}));

// Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});


module.exports = passport;
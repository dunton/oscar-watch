// FILE FOR PASSPORT JS USE
const passport = require("passport"); // import passport
const GoogleStrategy = require("passport-google-oauth20").Strategy; // import GoogleStrategy
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys.js"); // get api keys

const User = mongoose.model("users"); // 1 arg means fetch, 2 args mean load into

// done() takes an error object for its first argument

passport.serializeUser((user, done) => {
  done(null, user.id); // refers to mongo identifier (shortcut to user._id.oid)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

// tells passport to use google strategy
// params tell Google how to authenticate
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      //this is where we save user info
      const existingUser = await User.findOne({ googleId: profile.id }); // query to see if user exists returns a promise
      if (existingUser) {
        // we already have a user with this id
        done(null, existingUser);
      } else {
        // we dont have a user record with this id
        const user = await new User({
          googleId: profile.id,
          name: profile.displayName
        }).save(); // create and save new instance of a user
        done(null, user);
      }
    }
  )
);

// set up Facebook authentication
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ facebookId: profile.id }); // query to see if user exists returns a promise
      if (existingUser) {
        // we already have a user with this id
        done(null, existingUser);
      } else {
        // we dont have a user record with this id
        const user = await new User({
          facebookId: profile.id,
          name: profile.displayName
        }).save();
        done(null, user);
      }
    }
  )
);
